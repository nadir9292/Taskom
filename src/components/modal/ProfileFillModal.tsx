import AnimatedModal from '@/src/components/utils/AnimatedModal'
import { UserType } from '@/src/types/UserType'
import axios from 'axios'
import React, { FormEvent, useState, useEffect } from 'react'

type Props = {
  userCheck?: UserType
  isOpen: boolean
  closeCreateModal: () => void
}

const jobList = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'Software Engineer', 'QA Tester', 'UI/UX Designer',
  'Product Manager', 'Project Manager', 'Scrum Master', 'Data Analyst',
  'Data Scientist', 'Mobile Developer', 'Tech Lead', 'CTO', 'Cloud Engineer',
  'System Administrator', 'Security Engineer', 'Business Analyst', 'IT Support Specialist',
]

const ProfileFillModal = ({ userCheck, isOpen, closeCreateModal }: Props) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [job, setJob] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = Object.fromEntries(formData.entries())
    if (userCheck?.email) body.email = userCheck.email
    try {
      const res = await axios.post('/api/update-profile', body)
      if (res.status === 200) closeCreateModal()
    } catch (error) {
      console.error('Failed to update profile', error)
    }
  }

  useEffect(() => {
    setIsButtonDisabled(
      firstname.length < 2 || lastname.length < 2 || job.length < 1
    )
  }, [firstname, lastname, job])

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={true} onClose={() => null}>
      <h3 className="font-semibold text-xl text-center text-white mb-5">
        Complete your profile
      </h3>

      <form method="dialog" className="space-y-3" onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          className="glass-input opacity-50 italic"
          value={userCheck?.email ?? ''}
          disabled
        />
        <input
          name="firstname"
          type="text"
          placeholder="First name"
          className="glass-input"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          name="lastname"
          type="text"
          placeholder="Last name"
          className="glass-input"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <select
          name="job"
          defaultValue="Select your job"
          className="glass-input"
          onChange={(e) => setJob(e.target.value)}
        >
          <option disabled>Select your job</option>
          {jobList.map((j, index) => (
            <option key={index} value={j}>{j}</option>
          ))}
        </select>
        <button
          className="btn-violet btn-violet-lg"
          disabled={isButtonDisabled}
          style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
        >
          Save profile
        </button>
      </form>
    </AnimatedModal>
  )
}

export default ProfileFillModal
