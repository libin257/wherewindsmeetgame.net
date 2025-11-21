#!/usr/bin/env python3
"""
Article Generation Script
Main script to generate MDX articles using GPT-4o API.

Usage:
    python generate-articles.py [--batch-size 100] [--overwrite] [--test]
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from typing import List, Dict

# Add modules directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'modules'))

from excel_parser import ExcelParser
from api_client import APIClient
from file_writer import FileWriter
from internal_links import InternalLinksManager


class ArticleGenerator:
    def __init__(self, config_path: str = 'tools/articles/config.json', priority_range: tuple = None):
        """
        Initialize the article generator.

        Args:
            config_path: Path to configuration file
            priority_range: Optional tuple (min_priority, max_priority) to filter articles
        """
        self.config_path = config_path
        self.priority_range = priority_range
        self.config = None
        self.excel_parser = None
        self.api_client = None
        self.file_writer = None
        self.links_manager = None
        self.prompt_template = None

    def load_config(self) -> bool:
        """Load configuration from JSON file."""
        try:
            with open(self.config_path, 'r', encoding='utf-8') as f:
                self.config = json.load(f)
            print(f"✅ Configuration loaded from {self.config_path}")
            return True
        except Exception as e:
            print(f"❌ Error loading configuration: {str(e)}")
            return False

    def load_prompt_template(self) -> bool:
        """Load prompt template from file."""
        try:
            template_path = 'tools/articles/prompt-template.txt'
            with open(template_path, 'r', encoding='utf-8') as f:
                self.prompt_template = f.read()
            print(f"✅ Prompt template loaded")
            return True
        except Exception as e:
            print(f"❌ Error loading prompt template: {str(e)}")
            return False

    def initialize_modules(self) -> bool:
        """Initialize all modules."""
        try:
            # Initialize Excel parser with priority filter
            self.excel_parser = ExcelParser(
                self.config['excel_file'],
                priority_range=self.priority_range
            )
            if not self.excel_parser.load_data():
                return False

            # Display priority statistics
            self.excel_parser.print_priority_stats()

            # Validate URL paths (only check format, not categories)
            errors = self.excel_parser.validate_url_paths()
            if errors:
                print(f"\n⚠️  Found {len(errors)} URL format errors:")
                for error in errors[:3]:
                    print(f"  - {error}")
                if len(errors) > 3:
                    print(f"  ... and {len(errors) - 3} more")
                print()

            # Initialize API client
            self.api_client = APIClient(self.config)
            print("✅ API client initialized")

            # Initialize file writer
            self.file_writer = FileWriter(
                self.config['output_dir'],
                self.config['site_domain']
            )
            print("✅ File writer initialized")

            # Initialize internal links manager
            self.links_manager = InternalLinksManager(
                self.config['internal_links'],
                self.config['site_domain']
            )
            print("✅ Internal links manager initialized")

            return True

        except Exception as e:
            print(f"❌ Error initializing modules: {str(e)}")
            return False

    def build_prompt(self, article: Dict) -> str:
        """
        Build prompt for article generation.

        Args:
            article: Article metadata dictionary

        Returns:
            Complete prompt string
        """
        # Select internal links for this article
        internal_links = self.links_manager.select_links_for_article(
            article['url_path'],
            num_links=2
        )
        formatted_links = self.links_manager.format_links_for_prompt(internal_links)

        # Get current date
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Build prompt from template
        prompt = self.prompt_template.format(
            url_path=article['url_path'],
            article_title=article['title'],
            keyword=article['keyword'],
            reference_link=article['reference'] or 'No reference provided',
            internal_links=formatted_links,
            current_date=current_date
        )

        return prompt

    async def generate_all_articles(
        self,
        batch_size: int = 100,
        overwrite: bool = False,
        test_mode: bool = False
    ):
        """
        Generate all articles from Excel file.

        Args:
            batch_size: Number of concurrent API requests
            overwrite: Whether to overwrite existing files
            test_mode: If True, only process first 3 articles
        """
        print("\n" + "=" * 60)
        print("🚀 STARTING ARTICLE GENERATION")
        print("=" * 60 + "\n")

        # Get all articles
        articles = self.excel_parser.get_articles()

        if test_mode:
            articles = articles[:2]
            print(f"🧪 TEST MODE: Processing only {len(articles)} articles\n")

        print(f"📝 Total articles to generate: {len(articles)}\n")

        # Build prompts for all articles
        print("🔨 Building prompts...")
        prompts = []
        for article in articles:
            prompt = self.build_prompt(article)
            prompts.append((prompt, article))

        print(f"✅ Built {len(prompts)} prompts\n")

        # Generate articles via API
        print("🤖 Generating articles via GPT-4o API...")
        print(f"   Batch size: {batch_size}")
        print(f"   Concurrent limit: {self.config['concurrent_limit']}\n")

        results = await self.api_client.generate_articles_batch(
            prompts,
            batch_size=batch_size
        )

        print("\n💾 Saving generated articles...")

        # Save articles
        saved_count = 0
        failed_count = 0

        for article_info, content in results:
            if content:
                success = self.file_writer.save_article(
                    content,
                    article_info,
                    overwrite=overwrite
                )
                if success:
                    saved_count += 1
            else:
                self.file_writer.save_failed_article(
                    article_info,
                    "API generation failed"
                )
                failed_count += 1

        # Print statistics
        print("\n" + "=" * 60)
        print("📊 GENERATION COMPLETE")
        print("=" * 60)

        self.api_client.print_stats()
        self.file_writer.print_stats()
        self.links_manager.print_stats()

        # Summary
        print("\n" + "=" * 60)
        print("📋 SUMMARY")
        print("=" * 60)
        print(f"Total Articles:       {len(articles)}")
        print(f"Successfully Saved:   {saved_count} ✅")
        print(f"Failed:               {failed_count} ❌")
        print(f"Success Rate:         {round(saved_count / len(articles) * 100, 2)}%")
        print("=" * 60 + "\n")

        if failed_count > 0:
            print(f"ℹ️  Failed articles logged to: tools/articles/logs/failed_articles.log\n")


def parse_priority_range(priority_str: str) -> tuple:
    """
    Parse priority range string.

    Args:
        priority_str: Priority range string like "1-3"

    Returns:
        Tuple of (min_priority, max_priority)
    """
    try:
        parts = priority_str.split('-')
        if len(parts) == 2:
            min_p = int(parts[0])
            max_p = int(parts[1])
            if min_p > max_p:
                raise ValueError("Min priority must be <= max priority")
            return (min_p, max_p)
        else:
            raise ValueError("Invalid format. Use format like '1-3'")
    except Exception as e:
        raise ValueError(f"Invalid priority range '{priority_str}': {str(e)}")


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(description='Generate MDX articles using GPT-4o API')
    parser.add_argument(
        '--batch-size',
        type=int,
        default=100,
        help='Number of concurrent API requests (default: 100)'
    )
    parser.add_argument(
        '--overwrite',
        action='store_true',
        help='Overwrite existing MDX files'
    )
    parser.add_argument(
        '--test',
        action='store_true',
        help='Test mode: only process first 2 articles'
    )
    parser.add_argument(
        '--priority',
        type=str,
        help='Priority range to filter articles (e.g., "1-2" for priority 1 and 2)'
    )

    args = parser.parse_args()

    # Parse priority range if provided
    priority_range = None
    if args.priority:
        try:
            priority_range = parse_priority_range(args.priority)
            print(f"🎯 Priority filter: {priority_range[0]}-{priority_range[1]}\n")
        except ValueError as e:
            print(f"❌ Error: {str(e)}")
            print("   Example usage: --priority 1-3\n")
            sys.exit(1)

    # Create generator with priority filter
    generator = ArticleGenerator(priority_range=priority_range)

    # Load configuration and initialize
    if not generator.load_config():
        sys.exit(1)

    if not generator.load_prompt_template():
        sys.exit(1)

    if not generator.initialize_modules():
        sys.exit(1)

    # Generate articles
    try:
        asyncio.run(generator.generate_all_articles(
            batch_size=args.batch_size,
            overwrite=args.overwrite,
            test_mode=args.test
        ))
    except KeyboardInterrupt:
        print("\n\n⚠️  Generation interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Error during generation: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
