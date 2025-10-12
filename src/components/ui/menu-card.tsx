import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface MenuCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
}

export function MenuCard({ title, icon: Icon, href }: MenuCardProps) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center gap-3">
          <Icon className="h-6 w-6 text-primary" />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
