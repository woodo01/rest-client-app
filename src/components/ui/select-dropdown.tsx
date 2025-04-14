import { DropdownMenu } from './dropdown-menu';
import { DropdownMenuTrigger } from './dropdown-menu';
import { DropdownMenuContent } from './dropdown-menu';
import { DropdownMenuRadioGroup } from './dropdown-menu';
import { DropdownMenuRadioItem } from './dropdown-menu';

interface Menuitem {
  label: string;
  value: string;
}

interface Props {
  label: string;
  menuitems: Menuitem[];
  value: string;
  onChange: (val: string) => void;
}

const SelectDropdown = ({
  label,
  menuitems,
  value,
  onChange,
}: Props): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1 border rounded-sm border-blue-950">
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {menuitems.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
            ></DropdownMenuRadioItem>
          ))}
          <DropdownMenuRadioItem value="top">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Deutsch</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectDropdown;
