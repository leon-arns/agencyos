'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

type Column = {
  id: string;
  name: string;
  color?: string;
};

type KanbanData = {
  id: string;
  column: string;
  [key: string]: any;
};

type KanbanContextType = {
  columns: Column[];
  data: KanbanData[];
  onDataChange: (data: KanbanData[]) => void;
  activeItem: KanbanData | null;
  setActiveItem: (item: KanbanData | null) => void;
};

const KanbanContext = createContext<KanbanContextType | null>(null);

const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};

type KanbanProviderProps = {
  columns: Column[];
  data: KanbanData[];
  onDataChange: (data: KanbanData[]) => void;
  children: (column: Column) => React.ReactNode;
  renderDragOverlay?: (item: KanbanData) => React.ReactNode;
};

export const KanbanProvider = ({
  columns,
  data,
  onDataChange,
  children,
  renderDragOverlay,
}: KanbanProviderProps) => {
  const [activeItem, setActiveItem] = useState<KanbanData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = data.find((item) => item.id === active.id);
    setActiveItem(item || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeItem = data.find((item) => item.id === activeId);
    const overItem = data.find((item) => item.id === overId);

    if (!activeItem) return;

    // If dropping on a column
    if (columns.find((col) => col.id === overId)) {
      if (activeItem.column !== overId) {
        const updatedData = data.map((item) =>
          item.id === activeId ? { ...item, column: overId as string } : item
        );
        onDataChange(updatedData);
      }
      return;
    }

    // If dropping on another item
    if (overItem && activeItem.column !== overItem.column) {
      const updatedData = data.map((item) =>
        item.id === activeId ? { ...item, column: overItem.column } : item
      );
      onDataChange(updatedData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // If dropping on a column
    if (columns.find((col) => col.id === overId)) {
      const activeItem = data.find((item) => item.id === activeId);
      if (activeItem && activeItem.column !== overId) {
        const updatedData = data.map((item) =>
          item.id === activeId ? { ...item, column: overId as string } : item
        );
        onDataChange(updatedData);
      }
    }
  };

  return (
    <KanbanContext.Provider
      value={{ columns, data, onDataChange, activeItem, setActiveItem }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto">
          {columns.map((column) => children(column))}
        </div>
        <DragOverlay>
          {activeItem && (
            renderDragOverlay ? (
              renderDragOverlay(activeItem)
            ) : (
              <div className="rounded-lg border bg-background p-3 shadow-lg opacity-90">
                <div className="font-medium text-sm">{activeItem.name}</div>
              </div>
            )
          )}
        </DragOverlay>
      </DndContext>
    </KanbanContext.Provider>
  );
};

type KanbanBoardProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { data } = useKanban();
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const columnData = data.filter((item) => item.column === id);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-lg border-2 bg-muted/20 p-4 min-h-[400px] w-80 transition-colors',
        isOver && 'bg-muted/40 border-primary',
        className
      )}
    >
      <SortableContext items={columnData.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
};

type KanbanHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const KanbanHeader = ({ children, className }: KanbanHeaderProps) => {
  return (
    <div className={cn('mb-4 font-semibold text-sm', className)}>
      {children}
    </div>
  );
};

type KanbanCardsProps = {
  id: string;
  children: (item: KanbanData) => React.ReactNode;
  className?: string;
};

export const KanbanCards = ({ id, children, className }: KanbanCardsProps) => {
  const { data } = useKanban();
  const columnData = data.filter((item) => item.column === id);

  return (
    <div className={cn('space-y-3 flex-1', className)}>
      {columnData.map((item) => children(item))}
      {columnData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Keine Items
        </div>
      )}
    </div>
  );
};

type KanbanCardProps = {
  id: string;
  column: string;
  name: string;
  children: React.ReactNode;
  className?: string;
};

export const KanbanCard = ({
  id,
  column,
  name,
  children,
  className,
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'rounded-lg border bg-background p-3 shadow-sm hover:shadow-md transition-shadow',
        isDragging && 'opacity-50',
        className
      )}
    >
      <div 
        {...listeners}
        className="cursor-grab active:cursor-grabbing w-full"
      >
        {children}
      </div>
    </div>
  );
};