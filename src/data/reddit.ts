// src/data/reddit.ts

export interface RedditPost {
  title: string
  stats: string
  url: string
  category: 'technical' | 'review' | 'discussion'
}

export const redditPosts: RedditPost[] = [
  {
    title: 'Soft-lock? Progress Bug Solutions Thread',
    stats: '200+ upvotes',
    url: 'https://www.reddit.com/r/RueValleyGame/comments/1owazke/softlock/',
    category: 'technical'
  },
  {
    title: 'Rue Valley Review Mega Thread',
    stats: 'Collection of all reviews',
    url: 'https://www.reddit.com/r/rpg_gamers/comments/1otvwhk/rue_valley_review_mega_thread/',
    category: 'review'
  },
  {
    title: '[No Spoilers] Disappointed with Time Loop Design',
    stats: 'Hot discussion',
    url: 'https://www.reddit.com/r/RueValleyGame/comments/1owhg8u/no_spoilers_very_disappointed_with_the_game/',
    category: 'discussion'
  },
  {
    title: 'Is Rue Valley a Masterpiece or Disaster?',
    stats: 'Controversial discussion',
    url: 'https://www.reddit.com/r/rpg_gamers/comments/1owh5pm/rue_valley_is_terrible/',
    category: 'discussion'
  }
]
