import { ListItem } from '@mui/material';
import { BiFolder, BiHome } from 'react-icons/bi';

export default function Slidebar() {
    return (
        <div className="fixed h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-8">PM Dashboard</h1>
                <nav className="space-y-3">
                    <a className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                        <BiHome className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>
                    <a className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                        <BiFolder className="w-5 h-5" />
                        <span>Projects</span>
                    </a>
                    <a className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                        <ListItem className="w-5 h-5" />
                        <span>Tasks</span>
                    </a>
                </nav>
            </div>
            <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                Logout
            </div>
        </div>
    );
}
