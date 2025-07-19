"use client"

import type React from "react"
import { useRef, useCallback, useState, useEffect } from "react"
import { Button } from "./Button"
import { Separator } from "./Separator"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Table,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"

interface TableDimensions {
  rows: number
  cols: number
}

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

type RichTextEditorOneProps = {
  value?: string;
  onChange: (content: string) => void;
};

const RichTextEditorOne: React.FC<RichTextEditorOneProps> = ({ value = "", onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [showTableSelector, setShowTableSelector] = useState(false)
  const [isTableDragMode, setIsTableDragMode] = useState(false)
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })
  const [editorContent, setEditorContent] = useState<string>("") 

  useEffect(() => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML)
    }
  }, [])

  useEffect(() => {
    onChange(editorContent)
  }, [editorContent])

  
  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    // Update content state after command execution
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML)
    }
  }, [])

  const insertTable = useCallback((dimensions: TableDimensions) => {
    const { rows, cols } = dimensions

    if (!editorRef.current) return

    // Create table HTML string
    let tableHTML = `
      <table style="border-collapse: collapse; width: 100%; margin: 15px 0; border: 2px solid #333;">
        <tbody>
    `

    for (let i = 0; i < rows; i++) {
      tableHTML += "<tr>"
      for (let j = 0; j < cols; j++) {
        tableHTML += `
          <td style="
            border: 1px solid #666; 
            padding: 12px; 
            min-width: 120px; 
            min-height: 40px;
            background-color: #f9f9f9;
            vertical-align: top;
          " contenteditable="true">
            Click to edit
          </td>
        `
      }
      tableHTML += "</tr>"
    }

    tableHTML += `
        </tbody>
      </table>
      <p><br></p>
    `

    // Insert using execCommand with insertHTML
    try {
      const success = document.execCommand("insertHTML", false, tableHTML)
      if (!success) {
        // Fallback method
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const div = document.createElement("div")
          div.innerHTML = tableHTML
          range.deleteContents()
          range.insertNode(div.firstChild!)
        }
      }
    } catch (error) {
      console.error("Table insertion failed:", error)
      // Final fallback - direct innerHTML manipulation
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = tableHTML
        range.deleteContents()
        while (tempDiv.firstChild) {
          range.insertNode(tempDiv.firstChild)
        }
      }
    }

    setShowTableSelector(false)
    setIsTableDragMode(false)
    editorRef.current?.focus()
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML) // Update content state
    }
  }, [])

  const insertQuickTable = useCallback(() => {
    insertTable({ rows: 3, cols: 3 })
  }, [insertTable])

  const calculateTableDimensions = useCallback((startX: number, startY: number, currentX: number, currentY: number) => {
    const cellSize = 30 // Size of each cell in the visual grid
    const cols = Math.max(1, Math.floor(Math.abs(currentX - startX) / cellSize) + 1)
    const rows = Math.max(1, Math.floor(Math.abs(currentY - startY) / cellSize) + 1)
    return { rows: Math.min(rows, 10), cols: Math.min(cols, 10) } // Limit to 10x10
  }, [])

  const handleTableDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!isTableDragMode) return

      e.preventDefault()
      const rect = overlayRef.current?.getBoundingClientRect()
      if (!rect) return

      const startX = e.clientX - rect.left
      const startY = e.clientY - rect.top

      setDragState({
        isDragging: true,
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      })
    },
    [isTableDragMode],
  )

  const handleTableDragMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.isDragging || !isTableDragMode) return

      e.preventDefault()
      const rect = overlayRef.current?.getBoundingClientRect()
      if (!rect) return

      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      setDragState((prev) => ({
        ...prev,
        currentX,
        currentY,
      }))
    },
    [dragState.isDragging, isTableDragMode],
  )

  const handleTableDragEnd = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.isDragging || !isTableDragMode) return

      e.preventDefault()
      const dimensions = calculateTableDimensions(
        dragState.startX,
        dragState.startY,
        dragState.currentX,
        dragState.currentY,
      )

      insertTable(dimensions)

      setDragState({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
      })
    },
    [dragState, isTableDragMode, calculateTableDimensions, insertTable],
  )

  const handleTableButtonClick = useCallback(() => {
    setIsTableDragMode(!isTableDragMode)
    setShowTableSelector(false)
  }, [isTableDragMode])

  const insertBulletList = useCallback(() => {
    if (!editorRef.current) return

    const listHTML = `
    <ul style="margin: 15px 0; padding-left: 30px; list-style-type: disc;">
      <li style="margin-bottom: 8px; display: list-item;">New bullet point - click to edit</li>
    </ul>
    <p><br></p>
  `

    try {
      const success = document.execCommand("insertHTML", false, listHTML)
      if (!success) {
        // Fallback
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const div = document.createElement("div")
          div.innerHTML = listHTML
          range.deleteContents()
          range.insertNode(div.firstChild!)
        }
      }
    } catch (error) {
      console.error("List insertion failed:", error)
    }

    editorRef.current.focus()
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML) // Update content state
    }
  }, [])

  const insertNumberedList = useCallback(() => {
    if (!editorRef.current) return

    const listHTML = `
    <ol style="margin: 15px 0; padding-left: 30px; list-style-type: decimal;">
      <li style="margin-bottom: 8px; display: list-item;">New numbered item - click to edit</li>
    </ol>
    <p><br></p>
  `

    try {
      const success = document.execCommand("insertHTML", false, listHTML)
      if (!success) {
        // Fallback
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          const div = document.createElement("div")
          div.innerHTML = listHTML
          range.deleteContents()
          range.insertNode(div.firstChild!)
        }
      }
    } catch (error) {
      console.error("List insertion failed:", error)
    }

    editorRef.current.focus()
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML) // Update content state
    }
  }, [])

  const formatText = useCallback(
    (format: string) => {
      executeCommand(format)
    },
    [executeCommand],
  )

  const alignText = useCallback(
    (alignment: string) => {
      executeCommand(`justify${alignment}`)
    },
    [executeCommand],
  )

  const addTableRow = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    let currentNode = range.commonAncestorContainer as HTMLElement

    // Traverse up to find the nearest TD
    while (currentNode && currentNode !== editorRef.current && currentNode.tagName !== "TD") {
      currentNode = currentNode.parentElement as HTMLElement
    }

    if (currentNode && currentNode.tagName === "TD") {
      const currentRow = currentNode.closest("tr")
      if (currentRow) {
        const newRow = document.createElement("tr")
        const numCols = currentRow.children.length

        for (let i = 0; i < numCols; i++) {
          const newCell = document.createElement("td")
          newCell.setAttribute("contenteditable", "true")
          newCell.style.cssText = `
            border: 1px solid #666; 
            padding: 12px; 
            min-width: 120px; 
            min-height: 40px;
            background-color: #f9f9f9;
            vertical-align: top;
          `
          newCell.innerHTML = "<br>" // Ensure cell is not empty for cursor placement
          newRow.appendChild(newCell)
        }

        currentRow.after(newRow)

        // Move cursor to the first cell of the new row
        const firstNewCell = newRow.querySelector("td")
        if (firstNewCell) {
          const newRange = document.createRange()
          newRange.selectNodeContents(firstNewCell)
          newRange.collapse(true) // Collapse to the start
          selection.removeAllRanges()
          selection.addRange(newRange)
          editorRef.current?.focus()
        }
      }
    }
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML) // Update content state
    }
  }, [])

  const addTableColumn = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    let currentCell = range.commonAncestorContainer as HTMLElement

    // Traverse up to find the nearest TD
    while (currentCell && currentCell !== editorRef.current && currentCell.tagName !== "TD") {
      currentCell = currentCell.parentElement as HTMLElement
    }

    if (currentCell && currentCell.tagName === "TD") {
      const currentRow = currentCell.closest("tr")
      const parentTable = currentCell.closest("table")

      if (currentRow && parentTable) {
        // Check if it's the last cell in the row
        const cellsInRow = Array.from(currentRow.children)
        const isLastCellInRow = cellsInRow.indexOf(currentCell) === cellsInRow.length - 1

        if (isLastCellInRow) {
          const rows = Array.from(parentTable.querySelectorAll("tr"))
          let newCellInCurrentRow: HTMLTableCellElement | null = null

          rows.forEach((row) => {
            const newCell = document.createElement("td")
            newCell.setAttribute("contenteditable", "true")
            newCell.style.cssText = `
              border: 1px solid #666; 
              padding: 12px; 
              min-width: 120px; 
              min-height: 40px;
              background-color: #f9f9f9;
              vertical-align: top;
            `
            newCell.innerHTML = "<br>" // Ensure cell is not empty for cursor placement
            row.appendChild(newCell)

            if (row === currentRow) {
              newCellInCurrentRow = newCell
            }
          })

          // Move cursor to the newly created cell in the current row
          if (newCellInCurrentRow) {
            const newRange = document.createRange()
            newRange.selectNodeContents(newCellInCurrentRow)
            newRange.collapse(true) // Collapse to the start
            selection.removeAllRanges()
            selection.addRange(newRange)
            editorRef.current?.focus()
          }
        }
      }
    }
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML) // Update content state
    }
  }, [])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Escape to exit table drag mode
      if (e.key === "Escape" && isTableDragMode) {
        e.preventDefault()
        setIsTableDragMode(false)
        setDragState({
          isDragging: false,
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
        })
        return
      }

      // Shift + Enter for new table row
      if (e.shiftKey && e.key === "Enter") {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          let currentNode = selection.getRangeAt(0).commonAncestorContainer as HTMLElement
          while (currentNode && currentNode !== editorRef.current && currentNode.tagName !== "TD") {
            currentNode = currentNode.parentElement as HTMLElement
          }
          if (currentNode && currentNode.tagName === "TD") {
            e.preventDefault() // Prevent default new line
            addTableRow()
            return
          }
        }
      }

      // Enter in last cell of table for new column
      if (e.key === "Enter" && !e.shiftKey) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          let currentCell = selection.getRangeAt(0).commonAncestorContainer as HTMLElement
          while (currentCell && currentCell !== editorRef.current && currentCell.tagName !== "TD") {
            currentCell = currentCell.parentElement as HTMLElement
          }

          if (currentCell && currentCell.tagName === "TD") {
            const currentRow = currentCell.closest("tr")
            if (currentRow) {
              const cellsInRow = Array.from(currentRow.children)
              const isLastCellInRow = cellsInRow.indexOf(currentCell) === cellsInRow.length - 1

              if (isLastCellInRow) {
                e.preventDefault() // Prevent default new line
                addTableColumn()
                return
              }
            }
          }
        }
      }

      // Ctrl+B for bold
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault()
        formatText("bold")
      }
      // Ctrl+I for italic
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault()
        formatText("italic")
      }
      // Ctrl+U for underline
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
        formatText("underline")
      }
      // Ctrl+Q for quick 3x3 table
      if (e.ctrlKey && e.key === "q") {
        e.preventDefault()
        insertQuickTable()
      }
    },
    [formatText, insertQuickTable, isTableDragMode, addTableRow, addTableColumn],
  )

  // Render drag preview
  const renderDragPreview = () => {
    if (!dragState.isDragging || !isTableDragMode) return null

    const dimensions = calculateTableDimensions(
      dragState.startX,
      dragState.startY,
      dragState.currentX,
      dragState.currentY,
    )

    const cellSize = 30
    const width = dimensions.cols * cellSize
    const height = dimensions.rows * cellSize
    const left = Math.min(dragState.startX, dragState.currentX)
    const top = Math.min(dragState.startY, dragState.currentY)

    return (
      <div
        style={{
          position: "absolute",
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${height}px`,
          border: "2px solid #3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "0",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {dimensions.rows} × {dimensions.cols} table
        </div>
        {/* Grid lines */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Vertical lines */}
          {Array.from({ length: dimensions.cols + 1 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellSize}
              y1={0}
              x2={i * cellSize}
              y2={height}
              stroke="#3b82f6"
              strokeWidth="1"
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: dimensions.rows + 1 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellSize}
              x2={width}
              y2={i * cellSize}
              stroke="#3b82f6"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    )
  }

  const TableSelector: React.FC<{ onSelect: (dimensions: TableDimensions) => void }> = ({ onSelect }) => {
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)

    const handleCellHover = (row: number, col: number) => {
      setHoveredCell({ row, col })
    }

    const handleCellClick = (row: number, col: number) => {
      onSelect({ rows: row + 1, cols: col + 1 })
    }

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10">
        <div className="text-sm text-gray-600 mb-2">Select table size:</div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }, (_, index) => {
            const row = Math.floor(index / 8)
            const col = index % 8
            const isHighlighted = hoveredCell && row <= hoveredCell.row && col <= hoveredCell.col

            return (
              <div
                key={index}
                className={`w-4 h-4 border border-gray-300 cursor-pointer ${
                  isHighlighted ? "bg-blue-500" : "bg-white hover:bg-gray-100"
                }`}
                onMouseEnter={() => handleCellHover(row, col)}
                onClick={() => handleCellClick(row, col)}
              />
            )
          })}
        </div>
        {hoveredCell && (
          <div className="text-xs text-gray-500 mt-2">
            {hoveredCell.row + 1} × {hoveredCell.col + 1} table
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Button
             type="button"
              variant="ghost"
              size="sm"
              onClick={() => formatText("bold")}
              className="h-8 w-8 p-0"
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
             type="button"
              variant="ghost"
              size="sm"
              onClick={() => formatText("italic")}
              className="h-8 w-8 p-0"
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
             type="button"
              variant="ghost"
              size="sm"
              onClick={() => formatText("underline")}
              className="h-8 w-8 p-0"
              title="Underline (Ctrl+U)"
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <Button  type="button" variant="ghost" size="sm" title="Align Left" onClick={() => alignText("Left")} className="h-8 w-8 p-0">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button  type="button" variant="ghost" size="sm" title="Align Center" onClick={() => alignText("Center")} className="h-8 w-8 p-0">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button  type="button" variant="ghost" size="sm" title="Align Right" onClick={() => alignText("Right")} className="h-8 w-8 p-0">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
             type="button"
              variant="ghost"
              size="sm"
              onClick={insertBulletList}
              className="h-8 w-8 p-0"
              title="Insert Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
             type="button"
              variant="ghost"
              size="sm"
              onClick={insertNumberedList}
              className="h-8 w-8 p-0"
              title="Insert Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Table */}
          <div className="relative">
            <Button
             type="button"
              variant={isTableDragMode ? "default" : "ghost"}
              size="sm"
              onClick={handleTableButtonClick}
              className="h-8 w-8 p-0"
              title="Insert Table - Click to enable drag mode (Ctrl+Q for 3x3)"
            >
              <Table className="h-4 w-4" />
            </Button>
            {showTableSelector && <TableSelector onSelect={insertTable} />}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Button  type="button" variant="ghost" size="sm" onClick={() => executeCommand("undo")} className="h-8 w-8 p-0">
              <Undo className="h-4 w-4" />
            </Button>
            <Button  type="button" variant="ghost" size="sm" onClick={() => executeCommand("redo")} className="h-8 w-8 p-0">
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Font Size */}
          <select
            className="h-8 px-2 text-sm border border-gray-300 rounded"
            onChange={(e) => executeCommand("fontSize", e.target.value)}
            defaultValue="3"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3">12pt</option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>

          {/* Font Color */}
          <input
            type="color"
            className="h-8 w-12 border border-gray-300 rounded cursor-pointer"
            onChange={(e) => executeCommand("foreColor", e.target.value)}
            title="Text Color"
          />

          {/* Background Color */}
          <input
            type="color"
            className="h-8 w-12 border border-gray-300 rounded cursor-pointer"
            onChange={(e) => executeCommand("backColor", e.target.value)}
            title="Background Color"
          />
        </div>
      </div>

      {/* Table Drag Mode Indicator */}
      {isTableDragMode && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-2 text-sm text-blue-700">
          <div className="flex justify-between items-center">
            <span>🎯 Table Draw Mode Active - Drag on the editor to create a table</span>
            <span>Press Escape to cancel</span>
          </div>
        </div>
      )}

      {/* Editor with Overlay */}
      <div className="relative">
        {/* Drag Overlay */}
        {isTableDragMode && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 cursor-crosshair"
            onMouseDown={handleTableDragStart}
            onMouseMove={handleTableDragMove}
            onMouseUp={handleTableDragEnd}
            style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          >
            {renderDragPreview()}
          </div>
        )}

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[500px] p-6 focus:outline-none"
          style={{
            lineHeight: "1.6",
            fontSize: "14px",
          }}
          onKeyDown={handleKeyDown}
          onInput={() => {
            if (editorRef.current) {
              setEditorContent(editorRef.current.innerHTML) // Update content state on every input
            }
          }}
          onBlur={() => setShowTableSelector(false)}
          suppressContentEditableWarning={true}
        >
        </div>
      </div>
    </div>
  )
}

export default RichTextEditorOne;