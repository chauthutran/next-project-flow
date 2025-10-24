import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Typography,
    Box
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    align?: 'left' | 'right' | 'center';
    width?: number | string;
}

interface ExpandableTableProps<T> {
    data: T[];
    columns: Column<T>[];
    getRowId: (row: T) => string;
    renderExpandedContent: (row: T) => React.ReactNode;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
}

export default function ExpandableTable<T>({
    data,
    columns,
    getRowId,
    renderExpandedContent,
    onEdit,
    onDelete
}: ExpandableTableProps<T>) {
    const [openRow, setOpenRow] = useState<string | number | null>(null);

    const handleToggle = (id: string | number) => {
        setOpenRow(openRow === id ? null : id);
    };

    return (
        <TableContainer
            component={Paper}
            className="rounded-2xl h-[280px] overflow-y-auto"
        >
            <Table stickyHeader>
                <TableHead className="bg-gray-50">
                    <TableRow>
                        <TableCell width={30}></TableCell>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.key)}
                                align={col.align ?? 'left'}
                                width={col.width}
                                className="font-bold"
                                sx={{ fontWeight: 'bold', color: 'rgba(55, 65, 81, 1)' }} // Bold header text
                            >
                                {col.label}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableCell
                                align="right"
                                className="font-bold"
                                sx={{ fontWeight: 'bold', color: 'rgba(55, 65, 81, 1)' }} // Bold header text
                            >
                                #
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row) => {
                        const id = getRowId(row);
                        const isOpen = openRow === id;

                        return (
                            <React.Fragment key={id}>
                                <TableRow
                                    hover
                                    className="transition-colors duration-150 hover:bg-gray-50"
                                >
                                    {/* Expand icon */}
                                    <TableCell width={30} padding="checkbox">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleToggle(id)}
                                            className="text-gray-600 hover:text-blue-500 transition-colors"
                                        >
                                            {isOpen ? (
                                                <BiChevronUp size={16} />
                                            ) : (
                                                <BiChevronDown size={16} />
                                            )}
                                        </IconButton>
                                    </TableCell>

                                    {/* Main cells */}
                                    {columns.map((col) => (
                                        <TableCell
                                            key={String(col.key)}
                                            align={col.align ?? 'left'}
                                            onClick={() => handleToggle(id)}
                                            className="cursor-pointer"
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : (row[
                                                      col.key as keyof T
                                                  ] as ReactNode)}
                                        </TableCell>
                                    ))}

                                    {/* Action buttons */}
                                    {(onEdit || onDelete) && (
                                        <TableCell align="right">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(row)}
                                                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() =>
                                                        onDelete(row)
                                                    }
                                                    className="ml-2 px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>

                                {/* Expanded row */}
                                {renderExpandedContent && (
                                    <TableRow className=" bg-gray-50">
                                        <TableCell
                                            style={{
                                                paddingBottom: 0,
                                                paddingTop: 0
                                            }}
                                            colSpan={columns.length + 2}
                                        >
                                            <Collapse
                                                in={isOpen}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box
                                                    marginY={1.5}
                                                    marginX={2}
                                                    className="py-2 border-l-2 border-blue-300"
                                                >
                                                    {renderExpandedContent(row)}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
