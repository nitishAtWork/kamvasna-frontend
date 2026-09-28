export default function CheckoutSteps({
    currentStep = 1,
}) {
    const steps = [
        {
            number: 1,
            label: "Address",
        },
        {
            number: 2,
            label: "Review",
        },
        {
            number: 3,
            label: "Payment",
        },
    ];

    return (
        <div className="flex items-center">
            {steps.map(
                (step, index) => {
                    const active =
                        step.number <=
                        currentStep;

                    return (
                        <div
                            key={
                                step.number
                            }
                            className="flex flex-1 items-center"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                        active
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                >
                                    {
                                        step.number
                                    }
                                </span>

                                <span
                                    className={`hidden text-sm font-medium sm:block ${
                                        active
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {
                                        step.label
                                    }
                                </span>
                            </div>

                            {index <
                                steps.length -
                                    1 && (
                                <div
                                    className={`mx-3 h-px flex-1 ${
                                        step.number <
                                        currentStep
                                            ? "bg-black"
                                            : "bg-gray-200"
                                    }`}
                                />
                            )}
                        </div>
                    );
                }
            )}
        </div>
    );
}