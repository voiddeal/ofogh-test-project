import React, { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import { MdDelete, MdComment, MdEdit } from "react-icons/md"
import Portal from "../components/Portal"
import Comments from "../components/Comments"
import Modal from "../components/Modal"
import { FaMagnifyingGlass } from "react-icons/fa6"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type CellContext,
} from "@tanstack/react-table"
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../redux/features/apiSlice"
import type { Post, ToastProps } from "../types/models"
import { usePosts } from "../redux/hooks"
import BeatLoader from "../components/BeatLoader"
import EditPost from "../components/EditPost"
import TileBG from "../components/TileBG"
import Toast from "../components/Toast"

const initialToastValue: ToastProps = {
  message: "",
  type: undefined,
  duration: 3000,
}

const highlightMatch = (text: string, search: string): string => {
  if (!search) return text
  const regex = new RegExp(`(${search})`, "gi")
  return text.replace(regex, `<span class="bg-yellow-300 font-bold">$1</span>`)
}

export default function Posts() {
  const [deletePost] = useDeletePostMutation()
  const [searchText, setSearchText] = useState<string>("")
  const [tableData, setTableData] = useState<Post[]>([])
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [commentModalDisplay, setCommentModalDisplay] = useState(false)
  const [editModalDisplay, setEditModalDisplay] = useState(false)
  const [toast, setToast] = useState<ToastProps>(initialToastValue)
  const { isLoading } = useGetPostsQuery()
  const posts = usePosts()

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set(prevSelected)
      newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id)
      return newSelected
    })
  }

  const editPost = (id: number) => {
    setSelectedPostId(id)
    setEditModalDisplay(true)
  }

  const viewComments = (id: number) => {
    setSelectedPostId(id)
    setCommentModalDisplay(true)
  }

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    )

    if (!isConfirmed) return

    try {
      await deletePost(id).unwrap()
      setTableData((prevData) => prevData.filter((post) => post.id !== id))
      setToast({ message: "Post deleted successfully!", type: "success" })
    } catch (error) {
      setToast({
        message: "Failed to delete post.",
        type: "error",
        duration: 3000,
      })
    }
  }

  const handleBulkDelete = async () => {
    try {
      await Promise.all([...selectedRows].map((id) => deletePost(id).unwrap()))
      setTableData((prevData) =>
        prevData.filter((post) => !selectedRows.has(post.id))
      )
      setSelectedRows(new Set())
      setToast({ message: "Posts deleted successfully!", type: "success" })
    } catch (error) {
      setToast({
        message: "Failed to delete posts.",
        type: "error",
        duration: 3000,
      })
    }
  }

  const closeCommentsModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setCommentModalDisplay(false)
    }
  }

  const closeEditModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setEditModalDisplay(false)
    }
  }

  const columns: ColumnDef<Post>[] = [
    {
      header: "Select",
      size: 50,
      enableResizing: false,
      cell: ({ row }: CellContext<Post, any>) => (
        <input
          type="checkbox"
          checked={selectedRows.has(row.original.id)}
          className="block w-fit mx-auto scale-125"
          onChange={() => toggleRowSelection(row.original.id)}
        />
      ),
    },
    {
      header: "ID",
      accessorKey: "id",
      size: 50,
      enableSorting: true,
      sortingFn: "auto",
      enableResizing: true,
      cell: ({ row }: CellContext<Post, any>) => (
        <div className="text-center">{row.original.id}</div>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
      size: 200,
      enableSorting: true,
      sortingFn: "auto",
      enableResizing: true,
      cell: ({ row }: CellContext<Post, any>) => (
        <div
          dangerouslySetInnerHTML={{
            __html: highlightMatch(row.original.title, searchText),
          }}
        />
      ),
    },
    {
      header: "Body",
      accessorKey: "body",
      size: 300,
      enableSorting: true,
      sortingFn: "auto",
      enableResizing: true,
      cell: ({ row }: CellContext<Post, any>) => (
        <div
          dangerouslySetInnerHTML={{
            __html: highlightMatch(row.original.body, searchText),
          }}
        />
      ),
    },
    {
      header: "Actions",
      size: 150,
      enableSorting: false,
      enableResizing: false,
      cell: ({ row }: CellContext<Post, any>) => (
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2 text-2xl">
          <button
            title="Comments"
            className="w-fit hover:bg-blue-500 rounded-lg p-1 cursor-pointer group"
            onClick={() => viewComments(row.original.id)}
          >
            <MdComment className="text-blue-500 group-hover:text-white" />
          </button>
          <button
            title="Edit"
            className="w-fit hover:bg-yellow-500 rounded-lg p-1 cursor-pointer group"
            onClick={() => editPost(row.original.id)}
          >
            <MdEdit className="text-yellow-500 group-hover:text-white" />
          </button>
          <button
            title="Delete"
            className="w-fit hover:bg-red-500 rounded-lg p-1 cursor-pointer group"
            onClick={() => handleDelete(row.original.id)}
          >
            <MdDelete className="text-red-500 group-hover:text-white" />
          </button>
        </div>
      ),
    },
  ]

  const table = useReactTable<Post>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const exportToExcel = () => {
    if (!tableData.length) return
    const worksheet = XLSX.utils.json_to_sheet(tableData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts")
    XLSX.writeFile(workbook, "posts.xlsx")
  }

  useEffect(() => {
    if (!searchText) {
      setTableData(posts)
    } else {
      setTableData(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.body.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    }
  }, [searchText, posts])

  if (isLoading) return <BeatLoader />

  return (
    <main>
      <TileBG opacity={0.6} />
      <div className=" md:px-14 py-8 shadow-md text-black">
        <div className="flex items-center mb-4 gap-x-4 max-md:px-4">
          <div className="w-fit flex items-center bg-emerald-200 rounded">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-2 focus:outline-none"
            />
            <FaMagnifyingGlass size={25} color="teal" className="px-1" />
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer max-md:hidden"
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedRows.size})
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer ml-auto"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </div>
        <table className="w-full border bg-stone-800 text-[#e9e9e9]">
          <thead>
            <tr>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border px-2 py-1 cursor-pointer"
                    onClick={() => header.column.toggleSorting()}
                  >
                    {String(header.column.columnDef.header)}{" "}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-2 py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-x-4 mt-4">
          <button
            className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded disabled:opacity-50 cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <button
            className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white rounded disabled:opacity-50 cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
      {commentModalDisplay && (
        <Portal containerId="modal">
          <Modal backdropClickHandler={closeCommentsModal}>
            <Comments id={selectedPostId} />
          </Modal>
        </Portal>
      )}

      {editModalDisplay && (
        <Portal containerId="modal">
          <Modal backdropClickHandler={closeEditModal}>
            <EditPost
              id={selectedPostId}
              modalDisplay={setEditModalDisplay}
              setToast={setToast}
            />
          </Modal>
        </Portal>
      )}

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          setToast={setToast}
          initialToastValue={initialToastValue}
        />
      )}
    </main>
  )
}
