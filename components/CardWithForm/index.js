import * as React from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/router";

function CardWithForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") setTitle(value);
    else if (id === "description") setDescription(value);
    else if (id === "assignee") setAssignee(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      assignee,
    };

    if (title && description && assignee) {
      const res = await fetch(
        "https://task-management-df2ea-default-rtdb.firebaseio.com/taskRecord.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, description, assignee }),
        }
      );
      if (res) {
        alert("data stored");
      }
    }

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTitle("");
    setAssignee("");
    setDescription("");

    router.push("/allTasks");
  };

  return (
    <Card className="bg-zinc-950 dark:bg-white">
      <CardHeader>
        <CardTitle className="text-white">Create task</CardTitle>
        <CardDescription>create your new task in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                onChange={handleInputChange}
                value={title}
                id="title"
                placeholder="Title of your task"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                onChange={handleInputChange}
                value={description}
                id="description"
                placeholder="Description of your task"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="assignee">Assigned to</Label>
              <Input
                onChange={handleInputChange}
                value={assignee}
                id="assignee"
                placeholder="Assignee of your task"
              />
            </div>
          </div>
        </form>
        <div>
          <h3>Tasks List</h3>
          {tasks.map((task) => (
            <div key={task.id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>{task.assignee}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/allTasks" variant="outline">
          <Button className="hover:bg-red-600">Cancel</Button>
        </Link>
        <Button onClick={handleSubmit} className="hover:bg-green-600">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardWithForm;
