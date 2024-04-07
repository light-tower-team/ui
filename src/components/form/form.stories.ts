import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../button";
import Form from "./form.vue";
import FormCheckbox from "./form_checkbox";
import FormGroup from "./form_group";
import FormInput from "./form_input";

const meta: Meta<typeof Form> = {
  title: "components/form/form",
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => ({
    components: { Button, Form, FormGroup, FormInput, FormCheckbox },
    template: `
      <Form>
        <FormGroup label="Email address:" description="We'll never share your email with anyone else.">
          <FormInput placeholder="Enter email" />
        </FormGroup>
        <FormGroup label="Your Name:">
          <FormInput placeholder="Enter name" />
        </FormGroup>
        <FormCheckbox>Squash Commits</FormCheckbox>
        <FormCheckbox>Create New Issue</FormCheckbox>
        <div class="flex justify-end gap-2">
          <Button type="reset" variant="outlined" color="neutral">Cancel</Button>
          <Button type="submit" variant="filled" color="primary">Submit</Button>
        </div>
      </Form>
    `,
  }),
};
