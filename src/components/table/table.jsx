import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { columns, users } from "./data";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableToolbar() {
  const [selectedKeys, setSelectedKeys] = useState();
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}>
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat">
            {cellValue}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  console.log("SelectedKeys", selectedKeys);

  return (
    <div className="flex items-center justify-center items-center h-screen flex-col  ">
      {/* <Card className="w-4/5 h-auto p-5 flex items-center"> */}
      {/* <h1 className="mt-3">User List</h1> */}
      <div className="flex space-x-2 w-full ml-4">
        <Button className="bg-foreground text-background" size="sm">
          Block
        </Button>
        <Button size="sm" variant="flat">
          Unlock
        </Button>
        <Button size="sm" variant="flat">
          Delete
        </Button>
      </div>
      <div className="flex my-2 ml-6 w-full">
        <span className="text-default-400 text-small">
          Total {users.length} users
        </span>
      </div>
      {/* Container for the Table */}
      <div>
        <Table
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
          aria-label="User Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* </Card> */}
    </div>
  );
}
