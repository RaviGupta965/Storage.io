'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { actionsDropdownItems } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Models } from 'node-appwrite'
import Link from "next/link";
import { constructDownloadUrl, convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/files.action";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";

function ActionDropdown({ file }: { file: Models.Document }) {
  const [modelopen, setmodelopen] = useState(false);
  const [DropDownopen, setDropDownopen] = useState(false);
  const [action, setaction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setmodelopen(false);
    setDropDownopen(false);
    setaction(null);
    setName(file.name);
    setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);

    const actions: Record<string, () => Promise<unknown>> = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    try {
      const result = await actions[action.value]?.();
      if (result) closeAllModals();
    } catch (error) {
      console.error("ERROR :: FILE ACTION", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    const result = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });
    if (result) setEmails(updatedEmails);
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center">{label}</DialogTitle>

          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {value === "details" && (
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3">
                <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                <div className="flex flex-col">
                  <p className="subtitle-2">{file.name}</p>
                  <FormattedDateTime date={file.$createdAt} className="caption" />
                </div>
              </div>
              <p className="caption">Format: {file.extension}</p>
              <p className="caption">Size: {convertFileSize(file.size)}</p>
              <p className="caption">Owner: {file.owners?.username}</p>
              <p className="caption">Last edit: {formatDateTime(file.$updatedAt)}</p>
            </div>
          )}

          {value === "share" && (
            <div className="space-y-3 text-left">
              <Input
                type="email"
                placeholder="Enter email address"
                onChange={(e) =>
                  setEmails(e.target.value.trim() ? e.target.value.split(",").map((s) => s.trim()) : [])
                }
              />
              <div>
                <p className="subtitle-2 text-light-100">Shared with</p>
                <ul className="space-y-1">
                  {file.users?.map((email: string) => (
                    <li key={email} className="flex items-center justify-between">
                      <p className="subtitle-2">{email}</p>
                      <Image
                        src="/assets/icons/remove.svg"
                        alt="remove"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => handleRemoveUser(email)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {value === "delete" && (
            <DialogDescription className="text-center">
              Are you sure you want to delete{` `}
              <span className="font-medium">{file.name}</span>?
            </DialogDescription>
          )}
        </DialogHeader>

        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <span className="capitalize">{value}</span>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={modelopen} onOpenChange={setmodelopen}>
      <DropdownMenu open={DropDownopen} onOpenChange={setDropDownopen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image src="/assets/icons/dots.svg" alt="dots" height={34} width={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className="shad-dropdown-item"
              onClick={() => {
                setaction(item);
                if (["rename", "share", "delete", "details"].includes(item.value)) {
                  setmodelopen(true);
                }
              }}
            >
              {item.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image height={25} width={25} src={item.icon} alt={item.label} /> {item.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image height={25} width={25} src={item.icon} alt={item.label} /> {item.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
}

export default ActionDropdown;
