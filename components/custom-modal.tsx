"use client";

import React, { useEffect, useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import {
  Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Switch, CircularProgress
} from "@nextui-org/react";
import { MailIcon } from "@nextui-org/shared-icons";
import { Link } from "@nextui-org/link";

const CustomModal = ({ focusedTodo, modalType, onClose, onEdit, onDelete }: {
  focusedTodo: Todo,
  modalType: CustomModalType,
  onClose: () => void,
  onEdit: (id: string, title: string, isDone:boolean) => void,
  onDelete: (id: string) => void,
}) => {

  const [isDone, setIsDone] = useState(focusedTodo.is_done);
  const [isLoading, setIsLoading] = useState(false);
  const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);
  // const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);과 같은 코드
  // useEffect(() => {
  //     setEditedTodoInput(focusedTodo.title);
  // }, []);


  const DetailModal = () => {
    return <>
      <ModalHeader className="flex flex-col gap-1">View</ModalHeader>
      <ModalBody>
        <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
        <p><span className="font-bold">Title : </span>{focusedTodo.title}</p>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Completed : </span>
          {`${focusedTodo.is_done ? "Done" : "Progress"}`}
        </div>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Created : </span>
          <p>{`${focusedTodo.create_at}`}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="default" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
      </>
  }

  const ModifyModal = () => {
    return <>
      <ModalHeader className="flex flex-col gap-1">Modify</ModalHeader>
      <ModalBody>
        <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
        {/*<p>입력 된 할일 : {editedTodoInput}</p>*/}
        <Input
          label="To do"
          placeholder="Enter to do message."
          variant="bordered"
          isRequired
          defaultValue={focusedTodo.title}
          value={editedTodoInput}
          onValueChange={setEditedTodoInput}
        />
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Completed : </span>
          <Switch defaultSelected={focusedTodo.is_done}
          onValueChange={setIsDone}
          // aria-lable="Automatic updates"
          color="warning"
          >
          </Switch>
          { `${isDone? 'Done' : 'Progress'}` }
        </div>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Created : </span>
          <p>{`${focusedTodo.create_at}`}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" variant="flat" onPress={() => {
          setIsLoading(true);
          onEdit(focusedTodo.id, editedTodoInput, isDone)
        }}>
          {(isLoading) ? <CircularProgress
            size="sm"
            color="warning"
            aria-label="Loading..." /> : "Apply"}
        </Button>
        <Button color="default" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  }

  const DeleteModal = () => {
    return <>
      <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
      <ModalBody>
        <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
        <p><span className="font-bold">Title : </span>{focusedTodo.title}</p>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Completed : </span>
          {`${focusedTodo.is_done ? "Done" : "Progress"}`}
        </div>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Created : </span>
          <p>{`${focusedTodo.create_at}`}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={() => {
          setIsLoading(true);
          onDelete(focusedTodo.id);
        }}>
          {(isLoading) ? <CircularProgress
            size="sm"
            color="danger"
            aria-label="Loading..." /> : "Delete"}
        </Button>
        <Button color="default" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  }

  const getModal = (type: CustomModalType) => {
    //console.log(type);
    switch (type) {
      case 'detail':  return DetailModal();
      case 'modify':  return ModifyModal();
      case 'delete':  return DeleteModal();
      default: break;
    }
  }

  return (
    <>
      { getModal(modalType) }
    </>
  )
}

export default CustomModal;
