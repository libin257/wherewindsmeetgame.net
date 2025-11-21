"""
File Writer Module
Handles saving generated MDX articles to the correct directories.
"""
import os
import re
from typing import Dict, Optional
from datetime import datetime


class FileWriter:
    def __init__(self, output_dir: str, site_domain: str):
        """
        Initialize the file writer.

        Args:
            output_dir: Base output directory (e.g., 'src/content/')
            site_domain: Site domain for canonical URLs
        """
        self.output_dir = output_dir
        self.site_domain = site_domain
        self.stats = {
            'saved': 0,
            'skipped': 0,
            'errors': 0
        }

    def extract_category_and_filename(self, url_path: str) -> tuple:
        """
        Extract category and filename from URL path.

        Args:
            url_path: URL path like '/codes/pixel-blade-codes/'

        Returns:
            Tuple of (category, filename)
        """
        # Remove leading and trailing slashes
        path = url_path.strip('/')

        # Split into parts
        parts = path.split('/')

        if len(parts) >= 2:
            category = parts[0]
            filename = parts[1] + '.mdx'
        elif len(parts) == 1:
            # If only one part, use it as both category and filename
            category = parts[0]
            filename = parts[0] + '.mdx'
        else:
            raise ValueError(f"Invalid URL path: {url_path}")

        return category, filename

    def validate_mdx_content(self, content: str) -> tuple:
        """
        Validate MDX content structure.

        Args:
            content: The MDX content to validate

        Returns:
            Tuple of (is_valid, error_message)
        """
        # Check for YAML front matter
        if not content.startswith('---'):
            return False, "Missing YAML front matter (should start with '---')"

        # Check for closing front matter
        if content.count('---') < 2:
            return False, "Incomplete YAML front matter (missing closing '---')"

        # Extract front matter
        parts = content.split('---', 2)
        if len(parts) < 3:
            return False, "Invalid front matter structure"

        front_matter = parts[1]
        body = parts[2]

        # Check required front matter fields
        required_fields = ['title:', 'description:', 'keywords:', 'canonical:', 'date:']
        missing_fields = [field for field in required_fields if field not in front_matter]

        if missing_fields:
            return False, f"Missing required fields in front matter: {', '.join(missing_fields)}"

        # H1 validation removed - page template automatically renders title as H1
        # MDX content should NOT contain H1 to avoid duplicate H1 on the page

        # Check for H2 headings - DISABLED (too strict, GPT sometimes generates valid content with fewer H2s)
        # h2_count = len(re.findall(r'^## .+', body, re.MULTILINE))
        # if h2_count < 4:
        #     return False, f"Insufficient H2 headings (found {h2_count}, need at least 4)"

        return True, ""

    def save_article(
        self,
        content: str,
        article_info: Dict,
        overwrite: bool = False
    ) -> bool:
        """
        Save article to the appropriate directory.

        Args:
            content: The MDX content to save
            article_info: Dictionary with article metadata
            overwrite: Whether to overwrite existing files

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Validate content first
            is_valid, error_msg = self.validate_mdx_content(content)
            if not is_valid:
                print(f"❌ Validation failed for {article_info['title']}: {error_msg}")
                self.stats['errors'] += 1
                return False

            # Extract category and filename
            category, filename = self.extract_category_and_filename(article_info['url_path'])

            # Create full directory path
            dir_path = os.path.join(self.output_dir, category)
            os.makedirs(dir_path, exist_ok=True)

            # Create full file path
            file_path = os.path.join(dir_path, filename)

            # Check if file exists
            if os.path.exists(file_path) and not overwrite:
                print(f"⚠️  Skipping {filename} (already exists)")
                self.stats['skipped'] += 1
                return False

            # Save file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Saved: {category}/{filename}")
            self.stats['saved'] += 1
            return True

        except Exception as e:
            print(f"❌ Error saving {article_info['title']}: {str(e)}")
            self.stats['errors'] += 1
            return False

    def save_failed_article(
        self,
        article_info: Dict,
        error_msg: str = "API generation failed"
    ):
        """
        Log failed article generation.

        Args:
            article_info: Dictionary with article metadata
            error_msg: Error message
        """
        log_dir = os.path.join(os.path.dirname(self.output_dir), 'tools', 'articles', 'logs')
        os.makedirs(log_dir, exist_ok=True)

        log_file = os.path.join(log_dir, 'failed_articles.log')

        with open(log_file, 'a', encoding='utf-8') as f:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            f.write(f"[{timestamp}] {article_info['url_path']} - {article_info['title']}\n")
            f.write(f"  Reason: {error_msg}\n")
            f.write(f"  Keyword: {article_info['keyword']}\n")
            f.write("-" * 80 + "\n")

    def get_stats(self) -> Dict:
        """
        Get file writing statistics.

        Returns:
            Dictionary with statistics
        """
        return self.stats.copy()

    def print_stats(self):
        """Print formatted statistics."""
        stats = self.get_stats()
        total = stats['saved'] + stats['skipped'] + stats['errors']

        print("\n" + "=" * 60)
        print("📁 FILE WRITING STATISTICS")
        print("=" * 60)
        print(f"Total Processed:      {total}")
        print(f"Successfully Saved:   {stats['saved']} ✅")
        print(f"Skipped (exists):     {stats['skipped']} ⏭️")
        print(f"Errors:               {stats['errors']} ❌")

        if total > 0:
            success_rate = round(stats['saved'] / total * 100, 2)
            print(f"Success Rate:         {success_rate}%")

        print("=" * 60 + "\n")


if __name__ == "__main__":
    # Test the file writer
    writer = FileWriter("src/content/", "https://pixelbladegame.org")

    # Test article
    test_content = """---
title: "Test Article"
description: "This is a test article for validation"
keywords: ["test", "article"]
canonical: "https://pixelbladegame.org/codes/test-article/"
date: "2025-11-20"
---

# Test Article

This is a test article body.

## Section 1

Content here.

## Section 2

More content.

## Section 3

Even more content.

## Section 4

Final content.
"""

    test_info = {
        'url_path': '/codes/test-article/',
        'title': 'Test Article',
        'keyword': 'test'
    }

    # Test validation
    is_valid, error = writer.validate_mdx_content(test_content)
    print(f"Validation: {'✅ Valid' if is_valid else f'❌ Invalid - {error}'}")

    # Test extraction
    category, filename = writer.extract_category_and_filename(test_info['url_path'])
    print(f"Category: {category}, Filename: {filename}")
