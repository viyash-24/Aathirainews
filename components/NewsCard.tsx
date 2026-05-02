interface NewsCardProps {
  image: string;
  category: string;
  categoryTamil: string;
  timeAgo: string;
  title: string;
  description: string;
}

export default function NewsCard({
  image,
  category,
  categoryTamil,
  timeAgo,
  title,
  description,
}: NewsCardProps) {
  
