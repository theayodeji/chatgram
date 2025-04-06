export function formatMessageTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const diffMs = now - date; // Difference in milliseconds
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert to hours
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Convert to days

  // Check if it's from today
  if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  // If it's less than 24 hours but on a different calendar day
  if (diffHours < 24) {
      return `${diffHours}h ago`;
  }

  // If it's exactly yesterday (more than 24 hours but less than 48 hours)
  if (diffDays === 1) {
      return "Yesterday";
  }

  // If it's within the past week (2-6 days)
  if (diffDays < 7) {
      return `${diffDays}d ago`;
  }

  // Exactly 7 days ago
  if (diffDays === 7) {
      return `7d ago`;
  }

  // Older than a week
  return `More than a week ago`;
}
