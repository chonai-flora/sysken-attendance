import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

import { InputValues } from "../@types";
import { getCourses, registerMember } from "../api";
import { useAlertState } from "../hooks/useAlertState";

const MemberForm = (): JSX.Element => {
    const grades = [1, 2, 3, 4, 5];
    const { setAlert } = useAlertState();
    const [courseNames, setCourseNames] = useState<string>([]);
    const defaultValues: InputValues = {
        name: {
            lastName: "",
            firstName: "",
        },
        grade: grades[0],
        courseName: courseNames[0] || "",
        number: 1,
        barcode: "",
    };
    const {
        reset,
        register,
        getValues,
        handleSubmit,
    } = useForm<InputValues>({
        mode: "onChange",
        defaultValues,
    });

    const onSubmit = () => {
        registerMember(getValues())
            .then((responce) => {
                console.log(responce);
                setAlert(
                    <>
                        <FaRegCircleCheck className="text-lg text-green-500" />
                        <span>新しい部員を登録しました。</span>
                    </>
                );
            })
            .catch((error) => {
                console.error(error);
                setAlert(
                    <>
                        <FaRegCircleXmark className="text-lg text-red-500" />
                        <span>登録に失敗しました。</span>
                    </>
                );
            });

        reset();
    }

    useEffect(() => {
        getCourses()
            .then((responce) => {
                setCourseNames(responce.data.map((course) => course.name));
            });
    }, []);

    return (
        <form
            className="form-control gap-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <span className=" flex text-lg justify-center">
                部員を登録
            </span>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">名前</span>
                </div>
                <div className="flex justify-between">
                    <input
                        id="name.lastName"
                        className="w-[49.5%] input input-bordered"
                        placeholder="高専"
                        {...register("name.lastName", {
                            required: "必須項目です",
                        })}
                    />
                    <input
                        id="name.firstName"
                        className="w-[49.5%] input input-bordered"
                        placeholder="太郎"
                        {...register("name.firstName", {
                            required: "必須項目です",
                        })}
                    />
                </div>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">学年</span>
                </div>
                <select
                    id="grade"
                    className="select select-bordered"
                    defaultValue={defaultValues.grade}
                    {...register("grade", {
                        required: true,
                    })}
                >
                    {grades.map((grade) => (
                        <option value={grade} key={grade}>{grade}</option>
                    ))}
                </select>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">学科</span>
                </div>
                <select
                    id="courseName"
                    className="select select-bordered"
                    defaultValue={defaultValues.courseName}
                    {...register("courseName", {
                        required: true,
                    })}
                >
                    {courseNames.map((courseName) => (
                        <option value={courseName} key={courseName}>{courseName}</option>
                    ))}
                </select>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">出席番号</span>
                </div>
                <select
                    id="number"
                    className="select select-bordered"
                    defaultValue={defaultValues.number}
                    {...register("number", {
                        required: true,
                        valueAsNumber: true,
                    })}
                >
                    {Array(49).fill(0).map((_, n) => (
                        <option value={n + 1} key={n + 1}>{n + 1}</option>
                    ))}
                </select>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">バーコード</span>
                </div>

                <input
                    id="barcode"
                    type="password"
                    className="input input-bordered"
                    placeholder="ここをクリックしてバーコードをスキャンしてください"
                    {...register("barcode", {
                        required: "必須項目です",
                    })}
                />
            </label>

            <button type="submit" className="mt-8 btn">
                追加
            </button>
        </form>
    );
};

export default MemberForm;