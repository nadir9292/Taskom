import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { UserType } from '@/src/types/UserType'
import axios from 'axios'
import React, { FormEvent, useState, useEffect } from 'react'

type Props = {
  user: UserType
  isOpen: boolean
  closeModal: () => void
  onSaved: () => void
}

const jobList = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'Software Engineer', 'QA Tester', 'UI/UX Designer',
  'Product Manager', 'Project Manager', 'Scrum Master', 'Data Analyst',
  'Data Scientist', 'Mobile Developer', 'Tech Lead', 'CTO', 'Cloud Engineer',
  'System Administrator', 'Security Engineer', 'Business Analyst', 'IT Support Specialist',
]

const EditProfileModal = ({ user, isOpen, closeModal, onSaved }: Props) => {
  const [firstname, setFirstname] = useState(user.firstname ?? '')
  const [lastname, setLastname] = useState(user.lastname ?? '')
  const [job, setJob] = useState(user.job ?? '')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFirstname(user.firstname ?? '')
      setLastname(user.lastname ?? '')
      setJob(user.job ?? '')
    }
  }, [isOpen, user])

  const isDisabled = firstname.length < 2 || lastname.length < 2 || job.length < 1 || isLoading

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('/api/update-profile', { email: user.email, firstname, lastname, job })
      onSaved()
      closeModal()
    } catch (error) {
      console.error('Failed to update profile', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatedModal isOpen={isOpen} onClose={closeModal}>
      <h3 className="font-semibold text-xl text-center text-white mb-5">Edit profile</h3>

      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          type="text"
          className="glass-input opacity-50 italic"
          value={user.email ?? ''}
          disabled
        />
        <input
          type="text"
          placeholder="First name"
          className="glass-input"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          className="glass-input"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <select
          className="glass-input"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        >
          <option value="" disabled>Select your job</option>
          {jobList.map((j, i) => (
            <option key={i} value={j}>{j}</option>
          ))}
        </select>
        <button
          type="submit"
          className="btn-violet btn-violet-lg"
          disabled={isDisabled}
          style={{ opacity: isDisabled ? 0.5 : 1 }}
        >
          {isLoading ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </AnimatedModal>
  )
}

export default EditProfileModal
