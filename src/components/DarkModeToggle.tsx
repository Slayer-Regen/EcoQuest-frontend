import { Moon, Sun } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDarkMode } from '@/slices/darkModeSlice';
import { Button } from './ui/button';

export default function DarkModeToggle() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleDarkMode())}
            className="relative"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
                <Moon className="h-5 w-5 text-gray-700" />
            )}
        </Button>
    );
}
