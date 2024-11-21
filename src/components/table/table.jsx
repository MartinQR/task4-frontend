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
  TimeInput,
} from "@nextui-org/react";
import { columns, users } from "./data";
import { Time } from "@internationalized/date";
import { useLocation } from "react-router-dom";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableToolbar() {
  const [selectedKeys, setSelectedKeys] = useState();
  const location = useLocation();
  const{email}=location.state || {};
  // const email = location.state?.email || "Guest";

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "md", src: user.avatar, size: "sm" }}
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
      case "lastLogin":
        return (
          <div className="flex flex-row align-center justify-center">
            <div>
              <TimeInput defaultValue={new Time(11, 45)} />
            </div>
            <div className="flex items-center justify-center ">
              <p>- 05/10/2024</p>
            </div>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  console.log("SelectedKeys", selectedKeys);
  console.log(email);

  return (
    <div className="flex items-center justify-center items-center h-screen flex-col  ">
      {/* <Card className="w-4/5 h-auto p-5 flex items-center"> */}
      {/* <h1 className="mt-3">User List</h1> */}
      <div className="flex space-x-2 w-full ml-4">
        <Button className="bg-foreground text-background" size="sm">
          <div className="w-3">
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="100"
              width="100%">
              <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
            </svg>
          </div>
          <div>Block</div>
        </Button>
        <Button size="sm" variant="flat">
          <div className="w-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="100"
              width="100%">
              <path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z" />
            </svg>
          </div>
        </Button>
        <Button size="sm" variant="flat">
          <div className="w-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="100"
              width="100%">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
            </svg>
          </div>
        </Button>
      </div>
      <div className="flex my-2 ml-6 w-full">
        <span className="text-default-400 text-small">
          Total {users.length} users - Bienvenido {email}
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
