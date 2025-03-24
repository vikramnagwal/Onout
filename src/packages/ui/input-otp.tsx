export function InputOTP() {
    return (
        <div>
            {
                Array.from({length: 6}).map((_, index) => (
                    <input key={index} type="text" maxLength={1} className="w-12 h-12 m-[2px] text-center border border-gray-300 rounded-lg" />
                ))
            }
        </div>
    )
}