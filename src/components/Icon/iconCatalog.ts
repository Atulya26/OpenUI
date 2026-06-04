import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  Filter,
  Heart,
  Home,
  Image,
  Info,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  MoreHorizontal,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Settings,
  Share2,
  Shield,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';

export type IconCatalogEntry = {
  name: string;
  icon: LucideIcon;
};

export type IconCatalogGroup = {
  id: string;
  label: string;
  icons: IconCatalogEntry[];
};

/**
 * Curated starter set for common mobile UI (not the full Lucide library).
 * Browse all ~1,700+ icons in Storybook → Foundational → Icons → All Lucide.
 */
export const iconCatalog: IconCatalogGroup[] = [
  {
    id: 'navigation',
    label: 'Navigation',
    icons: [
      { name: 'Home', icon: Home },
      { name: 'Menu', icon: Menu },
      { name: 'Search', icon: Search },
      { name: 'ArrowLeft', icon: ArrowLeft },
      { name: 'ArrowRight', icon: ArrowRight },
      { name: 'ChevronLeft', icon: ChevronLeft },
      { name: 'ChevronRight', icon: ChevronRight },
      { name: 'ChevronUp', icon: ChevronUp },
      { name: 'ChevronDown', icon: ChevronDown },
      { name: 'ExternalLink', icon: ExternalLink },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    icons: [
      { name: 'Plus', icon: Plus },
      { name: 'Minus', icon: Minus },
      { name: 'X', icon: X },
      { name: 'Check', icon: Check },
      { name: 'Edit', icon: Edit },
      { name: 'Trash2', icon: Trash2 },
      { name: 'Copy', icon: Copy },
      { name: 'Download', icon: Download },
      { name: 'Upload', icon: Upload },
      { name: 'Share2', icon: Share2 },
      { name: 'Filter', icon: Filter },
      { name: 'MoreHorizontal', icon: MoreHorizontal },
      { name: 'MoreVertical', icon: MoreVertical },
      { name: 'Loader2', icon: Loader2 },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    icons: [
      { name: 'Mail', icon: Mail },
      { name: 'MessageCircle', icon: MessageCircle },
      { name: 'Phone', icon: Phone },
      { name: 'Bell', icon: Bell },
    ],
  },
  {
    id: 'user',
    label: 'User & account',
    icons: [
      { name: 'User', icon: User },
      { name: 'Users', icon: Users },
      { name: 'Settings', icon: Settings },
      { name: 'LogOut', icon: LogOut },
      { name: 'Lock', icon: Lock },
      { name: 'Shield', icon: Shield },
    ],
  },
  {
    id: 'media',
    label: 'Media & files',
    icons: [
      { name: 'Camera', icon: Camera },
      { name: 'Image', icon: Image },
      { name: 'File', icon: File },
      { name: 'Eye', icon: Eye },
      { name: 'EyeOff', icon: EyeOff },
    ],
  },
  {
    id: 'status',
    label: 'Status & feedback',
    icons: [
      { name: 'Info', icon: Info },
      { name: 'CircleAlert', icon: CircleAlert },
      { name: 'CircleCheck', icon: CircleCheck },
      { name: 'CircleX', icon: CircleX },
      { name: 'Star', icon: Star },
      { name: 'Heart', icon: Heart },
    ],
  },
  {
    id: 'misc',
    label: 'Misc',
    icons: [
      { name: 'Calendar', icon: Calendar },
      { name: 'Clock', icon: Clock },
      { name: 'MapPin', icon: MapPin },
      { name: 'CreditCard', icon: CreditCard },
    ],
  },
];
