import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  return (
    <header className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger>Languages</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Deutsch</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
    </header>
  );
};

export default Header;
