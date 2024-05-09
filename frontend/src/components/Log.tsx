import { useEffect, useRef, useState } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";
import { ja } from "date-fns/locale/ja";
import DatePicker, { registerLocale } from "react-datepicker";

import { Member } from "../@types";
import { createLog, getMemberByBarcode } from "../api";

registerLocale("ja", ja);

const Log = (): JSX.Element => {
    const [date, setDate] = useState<Date>(new Date());
    const [barcode, setBarcode] = useState<string>("");
    const [succeeded, setSucceeded] = useState<boolean | null>(null);
    const [memberInfo, setMemberInfo] = useState<Member | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="min-h-[90vh] gap-8 flex flex-col justify-center text-center">
            <h1 className="md:text-3xl sm:text-2xl text-lg font-semibold">学生証をスキャンしてください</h1>

            <div className="text-xl">
                {memberInfo
                    ? <p>{memberInfo.id}<br />{memberInfo.name}</p>
                    : <p>学生情報を取得できません</p>
                }
            </div>

            <DatePicker
                required
                className="w-1/3 input input-bordered"
                locale="ja"
                selected={date}
                dateFormat="yyyy年M月d日"
                onChange={(newDate: Date) => setDate(newDate)}
            />

            <div className="">
                <button
                    className={"btn w-1/6 mr-1"}
                    onClick={() => {
                        setBarcode("");
                        setSucceeded(null);
                        setMemberInfo(null);

                        inputRef.current!.focus();
                    }}
                >
                    リセット
                </button>
                <button
                    className={"btn w-1/6 ml-1 " + (memberInfo ?? "btn-disabled")}
                    onClick={(() => {
                        createLog(barcode, date)
                            .then((responce) => {
                                console.log(responce);
                                setSucceeded(true);
                            })
                            .catch((error) => {
                                console.error(error);
                                setSucceeded(false);
                            });
                    })}
                >
                    出席登録
                </button>
            </div>

            <div
                tabIndex={0}
                ref={inputRef}
                onKeyDown={((e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === "Enter") {
                        getMemberByBarcode(barcode)
                            .then((responce) => {
                                setMemberInfo(responce.data);
                            })
                            .catch(() => {
                                setMemberInfo(null);
                            });
                    }
                    else {
                        setBarcode((prev) => prev + e.key);
                    }
                })}
            />

            {succeeded != null && (
                <div className="toast w-full">
                    <div role="alert" className="alert flex">
                        {succeeded
                            ? (<>
                                <FaRegCircleCheck className="text-lg text-green-500" />
                                <span>{memberInfo?.id} の出席を登録しました。</span>
                            </>)
                            : (<>
                                <FaRegCircleXmark className="text-lg text-red-500" />
                                <span>登録に失敗しました。</span>
                            </>)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Log;