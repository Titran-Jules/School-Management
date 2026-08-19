import { z } from "zod";

export const userAuthSchema = z.object({
    ref: z.string().regex(/^(STD\d{5}|PROF\d{3}|ADMIN\d{3})$/, {
        message: 'The ref must follow format STDxxxxx or PROFxxx or ADMINxxx where x is an int'
    }),

    password: z.string().min(8, 'Password must be have at least 8 characters'),
});

export const studentRegistrationSchema = z.object({
    ref: z.string().regex(/^STD\d{5}$/, {
        message: 'The ref must begin with STD and contains 5 int.'
    }),

    firstName: z.string().min(1, "first name is required"),

    lastName: z.string().min(1, "last name is required"),

    email: z.string()
            .email('Email format not valid')
            .regex(/^hei\.[a-zA-Z0-9._%+-]+@gmail\.com$/, {
                message: "Email must begin with hei."
            }),

    password: z.string().min(8, 'Password must be have at least 8 characters'),

    gradeLevel: z.string().min(1, "Grade level is required"),
    group: z.string().min(1, "Group is required"),
});

export const teacherRegistrationSchema = z.object({
    ref: z.string().regex(/^PROF\d{5}$/, {
        message: 'The ref must begin with STD and contains 5 int.'
    }),

    firstName: z.string().nonempty(),

    lastName: z.string().nonempty(),

    email: z.string()
            .email('Email format not valid')
            .regex(/^hei\.[a-zA-Z0-9._%+-]+@gmail\.com$/, {
                message: "Email must begin with hei."
            }),

    password: z.string().min(8, 'Password must be have at least 8 characters'),
    ueIds: z.array(z.string()).default([]),
});