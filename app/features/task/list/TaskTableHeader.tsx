export default function TaskTableHeader() {
    return (
         <thead className="bg-gray-50 text-gray-700 text-sm">
            <tr>
                <th className="px-4 py-3 text-left">Task</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">status</th>
                <th className="px-4 py-3 text-left">Assigned To</th>
                <th className="px-4 py-3 text-right">Actions</th>
            </tr>
        </thead>
    );
}
