import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/src/components/ui/animated-modal'
import React from 'react'

type Props = object

export default function CreateTeamModal({}: Props) {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="btn btn-primary flex justify-center group/modal-btn">
          <span className="text-center">Create your team</span>
        </ModalTrigger>
        <ModalBody className="rounded-2xl mx-4 md:mx-1">
          <ModalContent>
            <div></div>
          </ModalContent>
          <ModalFooter className="relative overflow-hidden border-t">
            <div className="absolute inset-0 backdrop-blur-2xl"></div>
            <button className="btn btn-primary relative z-10">Create</button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  )
}
