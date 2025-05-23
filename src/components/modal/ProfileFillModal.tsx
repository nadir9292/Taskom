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
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Software Engineer',
  'QA Tester',
  'UI/UX Designer',
  'Product Manager',
  'Project Manager',
  'Scrum Master',
  'Data Analyst',
  'Data Scientist',
  'Mobile Developer',
  'Tech Lead',
  'CTO',
  'Cloud Engineer',
  'System Administrator',
  'Security Engineer',
  'Business Analyst',
  'IT Support Specialist',
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
    if (userCheck?.email) {
      body.email = userCheck.email
    }

    const res = await axios.post(`/api/update-profile`, body)

    if (res.status === 200) {
      closeCreateModal()
    }
  }

  useEffect(() => {
    const handleInputChange = () => {
      if (firstname.length >= 2 && lastname.length >= 2 && job.length >= 1) {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
    }

    handleInputChange()
  }, [firstname, lastname, job])

  if (!isOpen) return null

  return (
    <AnimatedModal isOpen={true} onClose={() => null}>
      <h3 className="font-medium text-xl text-center mb-4">
        Please complete your profile
      </h3>

      <form
        method="dialog"
        className="grid grid-cols-1 w-full"
        onSubmit={onSubmit}
      >
        <input
          name="email"
          type="text"
          className="input mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md italic"
          value={userCheck?.email ? userCheck.email : ''}
          disabled
        />
        <input
          name="firstname"
          type="text"
          placeholder="Firstname"
          className="input mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value)
          }}
        />
        <input
          name="lastname"
          type="text"
          placeholder="LastName"
          className="input mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value)
          }}
        />
        <select
          name="job"
          defaultValue="Select your job"
          className="select mb-4 w-full rounded-[22px] bg-white/50 backdrop-blur-lg border-transparent shadow-md"
          onChange={(e) => {
            setJob(e.target.value)
          }}
        >
          <option disabled={true}>Select your job</option>
          {jobList.map((job, index) => (
            <option key={index} value={job}>
              {job}
            </option>
          ))}
        </select>
        <button
          className="btn btn-secondary btn-lg mt-4 w-full shadow-md"
          disabled={isButtonDisabled}
        >
          Validate
        </button>
      </form>
    </AnimatedModal>
  )
}

export default ProfileFillModal
