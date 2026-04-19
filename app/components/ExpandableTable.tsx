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
import PrimaryButton from './buttons/PrimaryButton';
import AccentButton from './buttons/AccentButton';

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
            className="rounded-2xl h-[43vh] overflow-y-auto !bg-[var(--table-bg)]"
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width={30}  className='!bg-[var(--table-bg)]'></TableCell>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.key)}
                                align={col.align ?? 'left'}
                                width={col.width}
                                 className='!bg-[var(--table-bg)] !text-[var(--table-text)]'
                            >
                                {col.label}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableCell
                                align="right"
                                className="!bg-[var(--table-bg)] !text-[var(--table-text)]"
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
                                    className="!transition-colors !duration-150 !bg-[var(--table-row-bg)] !border !border-[var(--table-row-border)]"
                                >
                                    {/* Expand icon */}
                                    <TableCell width={30} padding="checkbox"
                                        className='!bg-[var(--table-row-bg)] !hover:bg-[var(--table-row-hover)] !border-b !border-[var(--table-row-border)] cursor-pointer'>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleToggle(id)}
                                            className="!transition-colors !text-[var(--table-text)]"
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
                                            className="!transition-colors !bg-[var(--table-row-bg)] !hover:bg-[var(--table-row-hover)] !border-b !border-[var(--table-row-border)] !text-[var(--table-text)] cursor-pointer"
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
                                        <TableCell align="right" className="!transition-colors !bg-[var(--table-row-bg)] !hover:bg-[var(--table-row-hover)] !border-b !border-[var(--table-row-border)] !text-[var(--table-text)] cursor-pointer space-x-2">
                                            {onEdit && (
                                                <PrimaryButton
                                                    onClick={() => onEdit(row)}
                                                    title="Edit"
                                                    className="px-3 py-1 text-sm text-[var(--table-button-text)] bg-[var(--table-button-bg)] rounded-lg hover:bg-[var(--table-button-text-hover)] transition-colors"
                                                />
                                            )}
                                            {onDelete && (
                                                <AccentButton
                                                    onClick={() =>
                                                        onDelete(row)
                                                    }
                                                    title="Delete"
                                                />
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>

                                {/* Expanded row */}
                                {renderExpandedContent && (
                                    <TableRow className=" bg-[var(--table-row-bg)]">
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
                                                    className="py-2 border-l-2 border-[var(--table-row-border)]"
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
