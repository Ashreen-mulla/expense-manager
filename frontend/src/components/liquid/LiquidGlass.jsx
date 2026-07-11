import clsx from "clsx";

export default function LiquidGlass({

                                        children,
                                        className = "",

                                    }) {

    return (

        <div
            className={clsx(

                `
                relative
                overflow-hidden
                rounded-[32px]

                border
                border-white/25

                bg-white/[0.10]

                backdrop-blur-[32px]

                shadow-[0_10px_50px_rgba(15,23,42,0.18)]

                before:absolute
                before:inset-0
                before:pointer-events-none
                before:bg-gradient-to-b
                before:from-white/45
                before:via-white/10
                before:to-transparent

                after:absolute
                after:inset-[1px]
                after:rounded-[31px]
                after:border
                after:border-white/20
                after:pointer-events-none
                `,

                className

            )}
        >

            <div
                className="
                absolute
                left-6
                top-4

                h-8
                w-3/4

                rounded-full

                bg-white/30

                blur-xl
                opacity-70
                pointer-events-none
                "
            />

            <div className="relative z-10">

                {children}

            </div>

        </div>

    );

}