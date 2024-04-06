import type { Meta, StoryObj } from "@storybook/vue3";
import Form from "./form.vue";
import FormGroup from "./form_group";
import FormInput from "./form_input";
import Button from "../button";

const meta: Meta<typeof Form> = {
  title: "components/form/form",
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => ({
    components: { Button, Form, FormGroup, FormInput },
    template: `
      <Form>
        <FormGroup label="Email address:" description="We'll never share your email with anyone else.">
          <FormInput placeholder="Enter email" />
        </FormGroup>
        <FormGroup label="Your Name:">
          <FormInput placeholder="Enter name" />
        </FormGroup>
        <div class="flex justify-end gap-2">
          <Button type="reset" variant="outlined" color="neutral">Cancel</Button>
          <Button type="submit" variant="filled" color="primary">Submit</Button>
        </div>
      </Form>
    `,
  }),
};
