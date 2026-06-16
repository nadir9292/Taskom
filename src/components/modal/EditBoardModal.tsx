'use client'

import React, { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import AnimatedModal from '@/src/components/utils/AnimatedModal'
import SnackBar from '@/src/components/utils/SnackBar'
import { SnackBarStatus } from '@/src/types/SnackBarStatus'
import { ScrumStepType } from '@/src/types/ScrumStepType'
import { useApiRoutes } from '@/src/contexts/ApiContext'
import { XMarkIcon, Bars3Icon, PlusIcon } from '@heroicons/react/24/outline'

type Props = {
  idscrumtab: number
  idteam: number
  currentSteps: ScrumStepType[]
  isOpen: boolean
  closeModal: () => void
}

type EditableStep = {
  idscrumstep?: number
  title: string
  order: number
}

const EditBoardModal = ({ idscrumtab, idteam, currentSteps, isOpen, closeModal }: Props) => {
  const { refreshData } = useApiRoutes()
  const [steps, setSteps] = useState<EditableStep[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [snackBar, setSnackBar] = useState<{ error: SnackBarStatus; success: SnackBarStatus }>({
    error: { active: false, message: null },
    success: { active: false, message: null },
  })

  useEffect(() => {
    if (isOpen) {
      setSteps(
        [...currentSteps]
          .sort((a, b) => a.order - b.order)
          .map((s) => ({ idscrumstep: s.idscrumstep, title: s.title, order: s.order }))
      )
    }
  }, [isOpen, currentSteps])

  const addStep = () => {
    setSteps((prev) => [...prev, { title: '', order: prev.length + 1 }])
  }

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 })))
  }

  const updateTitle = (index: number, title: string) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, title } : s)))
  }

  const onDragStart = (index: number) => setDragIndex(index)

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    setSteps((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(index, 0, moved)
      return next.map((s, i) => ({ ...s, order: i + 1 }))
    })
    setDragIndex(index)
  }

  const onDragEnd = () => setDragIndex(null)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (steps.some((s) => !s.title.trim())) return
    setIsLoading(true)
    try {
      await axios.put('/api/update-scrumsteps', { idscrumtab, idteam, steps })
      await refreshData()
      setSnackBar((prev) => ({ ...prev, success: { active: true, message: 'Steps updated.' } }))
      setTimeout(() => {
        setSnackBar({ error: { active: false, message: null }, success: { active: false, message: null } })
        closeModal()
      }, 1500)
    } catch {
      setSnackBar((prev) => ({ ...prev, error: { active: true, message: 'Failed to update steps.' } }))
      setTimeout(() => setSnackBar((prev) => ({ ...prev, error: { active: false, message: null } })), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeModal} variant="edit">
      <button
        className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
        onClick={closeModal}
      >
        <XMarkIcon className="w-5 h-5 text-white/60" />
      </button>

      <h1 className="text-center text-xl font-semibold text-white mb-5">Edit steps</h1>

      <form className="space-y-3" onSubmit={save}>
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(e) => onDragOver(e, index)}
              onDragEnd={onDragEnd}
              className={`flex items-center gap-2 p-2 rounded-xl border transition-colors ${
                dragIndex === index
                  ? 'border-violet-400/60 bg-violet-500/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <Bars3Icon className="w-4 h-4 text-white/30 cursor-grab shrink-0" />
              <input
                type="text"
                value={step.title}
                onChange={(e) => updateTitle(index, e.target.value)}
                placeholder="Step name"
                required
                className="glass-input flex-1 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="p-1.5 rounded-lg hover:bg-red-500/15 transition-colors shrink-0"
              >
                <XMarkIcon className="w-3.5 h-3.5 text-red-400/60 hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addStep}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-white/50 text-xs border border-dashed border-white/12 hover:border-violet-400/50 hover:text-violet-300 transition-all"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add step
        </button>

        <button type="submit" className="btn-violet btn-violet-lg">
          {isLoading ? <span className="loading loading-dots loading-md" /> : 'Save steps'}
        </button>
      </form>

      <SnackBar error={snackBar.error} success={snackBar.success} />
    </AnimatedModal>
  )
}

export default EditBoardModal
