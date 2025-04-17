import { UserType } from '@/src/types/UserType'
import axios from 'axios'
import React, { FormEvent, useState, useEffect } from 'react'

type Props = { userCheck?: UserType }

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

const ProfileFillModal = ({ userCheck }: Props) => {
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
      const modal = document.getElementById('profileFill') as HTMLDialogElement
      if (modal) {
        modal.close()
      }
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

  return (
    <dialog id="profileFill" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-primary text-xl text-center">
          Please complete your profile
        </h3>

        <div className="modal-action">
          <form
            method="dialog"
            className="grid grid-cols-1 w-full"
            onSubmit={onSubmit}
          >
            <input
              name="email"
              type="text"
              className="input my-2 w-full italic"
              value={userCheck?.email ? userCheck.email : ''}
              disabled
            />
            <input
              name="firstname"
              type="text"
              placeholder="Firstname"
              className="input border border-gray-900 my-2 w-full"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
            />
            <input
              name="lastname"
              type="text"
              placeholder="LastName"
              className="input border border-gray-900 my-2 w-full"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value)
              }}
            />
            <select
              name="job"
              defaultValue="Select your job"
              className="select border border-gray-900 w-full my-2"
              onChange={(e) => {
                setJob(e.target.value)
              }}
            >
              <option disabled={true}>Pick a color</option>
              {jobList.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
            </select>
            <button
              className="btn mt-4 btn-primary"
              disabled={isButtonDisabled}
            >
              Validate
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default ProfileFillModal
