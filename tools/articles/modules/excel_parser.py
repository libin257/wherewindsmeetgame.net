"""
Excel Parser Module
Reads article data from Excel file and validates the structure.
"""
import pandas as pd
from typing import List, Dict
import os


class ExcelParser:
    def __init__(self, excel_file_path: str, priority_range: tuple = None):
        """
        Initialize the Excel parser.

        Args:
            excel_file_path: Path to the Excel file
            priority_range: Optional tuple (min_priority, max_priority) to filter articles
        """
        self.excel_file_path = excel_file_path
        self.priority_range = priority_range
        self.data = None
        self.original_data = None  # Store original data before filtering

    def load_data(self) -> bool:
        """
        Load and validate Excel file.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if not os.path.exists(self.excel_file_path):
                print(f"❌ Error: Excel file not found at {self.excel_file_path}")
                return False

            # Read Excel file
            self.original_data = pd.read_excel(self.excel_file_path)
            self.data = self.original_data.copy()

            # Validate required columns
            required_columns = ['URL Path', 'Article Title', 'Keyword', 'Reference Link']
            missing_columns = [col for col in required_columns if col not in self.data.columns]

            if missing_columns:
                print(f"❌ Error: Missing required columns: {', '.join(missing_columns)}")
                return False

            # Apply priority filter if specified
            if self.priority_range:
                min_priority, max_priority = self.priority_range
                if 'Priority' in self.data.columns:
                    original_count = len(self.data)
                    self.data = self.data[
                        (self.data['Priority'] >= min_priority) &
                        (self.data['Priority'] <= max_priority)
                    ]
                    filtered_count = len(self.data)
                    print(f"✅ Successfully loaded {original_count} articles from Excel")
                    print(f"🎯 Filtered to {filtered_count} articles (Priority {min_priority}-{max_priority})")
                else:
                    print(f"⚠️  Warning: Priority column not found, loading all articles")
                    print(f"✅ Successfully loaded {len(self.data)} articles from Excel")
            else:
                print(f"✅ Successfully loaded {len(self.data)} articles from Excel")

            return True

        except Exception as e:
            print(f"❌ Error loading Excel file: {str(e)}")
            return False

    def get_articles(self) -> List[Dict[str, str]]:
        """
        Get all articles as a list of dictionaries.

        Returns:
            List of article dictionaries with keys: url_path, title, keyword, reference
        """
        if self.data is None:
            print("❌ Error: Data not loaded. Call load_data() first.")
            return []

        articles = []
        for index, row in self.data.iterrows():
            # Skip rows with missing essential data
            if pd.isna(row['URL Path']) or pd.isna(row['Article Title']) or pd.isna(row['Keyword']):
                print(f"⚠️  Warning: Skipping row {index + 1} due to missing data")
                continue

            article = {
                'url_path': str(row['URL Path']).strip(),
                'title': str(row['Article Title']).strip(),
                'keyword': str(row['Keyword']).strip(),
                'reference': str(row['Reference Link']).strip() if not pd.isna(row['Reference Link']) else ''
            }
            articles.append(article)

        return articles

    def get_article_count(self) -> int:
        """
        Get total number of valid articles.

        Returns:
            int: Number of articles
        """
        return len(self.get_articles())

    def validate_url_paths(self) -> List[str]:
        """
        Validate URL paths and return any issues.

        Returns:
            List of validation error messages
        """
        errors = []
        articles = self.get_articles()

        for idx, article in enumerate(articles):
            url_path = article['url_path']

            # Check if URL path starts with /
            if not url_path.startswith('/'):
                errors.append(f"Row {idx + 1}: URL path should start with '/' - got '{url_path}'")

            # Check if URL path ends with /
            if not url_path.endswith('/'):
                errors.append(f"Row {idx + 1}: URL path should end with '/' - got '{url_path}'")

            # Category validation removed - now accepts all categories

        return errors


    def get_priority_stats(self) -> Dict:
        """
        Get priority distribution statistics.

        Returns:
            Dictionary with priority statistics
        """
        if self.original_data is None or 'Priority' not in self.original_data.columns:
            return {}

        stats = {
            'total': len(self.original_data),
            'distribution': self.original_data['Priority'].value_counts().sort_index().to_dict(),
            'filtered_count': len(self.data) if self.data is not None else 0
        }
        return stats

    def print_priority_stats(self):
        """Print formatted priority statistics."""
        stats = self.get_priority_stats()

        if not stats:
            print("⚠️  No priority information available")
            return

        print("\n" + "=" * 60)
        print("📊 PRIORITY STATISTICS")
        print("=" * 60)
        print(f"Total Articles:       {stats['total']}")
        print(f"\nPriority Distribution:")
        for priority, count in sorted(stats['distribution'].items()):
            print(f"  Priority {priority:2d}:      {count} articles")

        if self.priority_range:
            min_p, max_p = self.priority_range
            print(f"\n🎯 Filter Applied:    Priority {min_p}-{max_p}")
            print(f"Filtered Articles:    {stats['filtered_count']}")

        print("=" * 60 + "\n")


if __name__ == "__main__":
    # Test the parser without filter
    print("=== Test 1: Load all articles ===")
    parser = ExcelParser("tools/articles/内页.xlsx")
    if parser.load_data():
        parser.print_priority_stats()
        articles = parser.get_articles()
        print(f"📊 Total articles: {len(articles)}\n")

    # Test with priority filter
    print("\n=== Test 2: Load Priority 1-2 articles ===")
    parser_filtered = ExcelParser("tools/articles/内页.xlsx", priority_range=(1, 2))
    if parser_filtered.load_data():
        parser_filtered.print_priority_stats()
        articles = parser_filtered.get_articles()
        print(f"📊 Filtered articles: {len(articles)}\n")
