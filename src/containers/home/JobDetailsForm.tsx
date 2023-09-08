import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";

interface JobDetailsFormProps {
  handleTab: (n: PageNumbers) => void;
  onSubmit: (data: IJobDetails) => void;
  onChange: (data: IJobDetails) => void;
  formData: IJobDetails;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  handleTab,
  onSubmit,
  onChange,
  formData,
}) => {
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string(), // jobPosition is not required
      }),
      onSubmit: (values) => {
        console.log({ values });
        onSubmit(values);
        handleTab(2);
      },
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.jobTitle}
          error={errors.jobTitle}
          touched={touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.jobDetails}
          error={errors.jobDetails}
          touched={touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.jobLocation}
          error={errors.jobLocation}
          touched={touched.jobLocation}
        />

        <Flex w="100%" justify="space-between" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
