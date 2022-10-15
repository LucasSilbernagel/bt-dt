import { ComponentStory, ComponentMeta } from '@storybook/react'
import ConfirmModal from '.'

export default {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ConfirmModal>

const Template: ComponentStory<typeof ConfirmModal> = (args) => (
  <ConfirmModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  isModalOpen: true,
  confirmMessage: 'Are you sure you want to delete all saved data?',
  handleCloseModal: () => null,
  handleConfirm: () => null,
}
