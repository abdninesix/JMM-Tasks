"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ComboBoxProps<T> {
    options: T[];
    placeholder?: string;
    getOptionLabel: (option: T) => string;
    getOptionValue: (option: T) => string | number;
    onSelect?: (option: T | null) => void;
}

const NewComboBox = <T,>({
    options,
    placeholder = "Select an option...",
    getOptionLabel,
    getOptionValue,
    onSelect,
}: ComboBoxProps<T>) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<T | null>(null);
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const comboBoxRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        if (inputValue === "") {
            setFilteredOptions(options);
        } else {
            setFilteredOptions(
                options.filter((option) =>
                    getOptionLabel(option)
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                )
            );
        }
        setHighlightedIndex(-1); // Reset highlighted index when filtering
        // Reset option refs array
        optionRefs.current = [];
    }, [inputValue, options]);

    // Scroll to highlighted option
    useEffect(() => {
        if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
            optionRefs.current[highlightedIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [highlightedIndex]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                comboBoxRef.current &&
                !comboBoxRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true);
        setSelectedOption(null);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setIsOpen(true);
            if (filteredOptions.length > 0) {
                setHighlightedIndex(
                    e.key === "ArrowDown" ? 0 : filteredOptions.length - 1
                );
            }
            return;
        }

        if (!isOpen) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (filteredOptions.length > 0) {
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : 0
                    );
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (filteredOptions.length > 0) {
                    setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : filteredOptions.length - 1
                    );
                }
                break;
            case "Enter":
                e.preventDefault();
                if (
                    highlightedIndex >= 0 &&
                    highlightedIndex < filteredOptions.length
                ) {
                    handleOptionSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
            case "Tab":
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    const handleOptionSelect = (option: T) => {
        setSelectedOption(option);
        setInputValue(getOptionLabel(option));
        setIsOpen(false);
        setHighlightedIndex(-1);
        onSelect?.(option);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleClearSelection = () => {
        setInputValue("");
        setSelectedOption(null);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onSelect?.(null);
    };

    return (
        <div className="relative w-full max-w-md" ref={comboBoxRef}>
            <div className="relative">
                <Search className="size-5 absolute left-2 top-1/4 text-gray-400 dark:text-gray-500" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full pl-8 py-2.5 pr-20 border border-input dark:border-input dark:bg-input/30 dark:hover:bg-input/50 text-foreground dark:text-foreground text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-theme1 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls="combobox-options"
                    aria-autocomplete="list"
                    aria-activedescendant={
                        highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined
                    }
                />
                {selectedOption && (
                    <button
                        type="button"
                        onClick={handleClearSelection}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Clear selection"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Toggle dropdown"
                >
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    id="combobox-options"
                    className="absolute z-10 w-full mt-1 bg-card border border-input rounded-lg text-sm shadow-lg max-h-60 overflow-y-scroll"
                    role="listbox"
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <button
                                key={getOptionValue(option)}
                                ref={(el) => {
                                    optionRefs.current[index] = el;
                                }}
                                id={`option-${index}`}
                                onClick={() => handleOptionSelect(option)}
                                className={`w-full px-4 py-2 text-left focus:outline-none first:rounded-t-lg last:rounded-b-lg transition-colors ${index === highlightedIndex
                                    ? "bg-input/30 text-foreground"
                                    : "text-foreground hover:bg-input/30 focus:bg-gray-50 dark:focus:bg-gray-700"
                                    }`}
                                role="option"
                                aria-selected={
                                    selectedOption
                                        ? getOptionValue(selectedOption) === getOptionValue(option)
                                        : false
                                }
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {getOptionLabel(option)}
                            </button>
                        ))
                    ) : (
                        <div
                            className="px-4 py-2 text-gray-500 dark:text-gray-400"
                            role="status"
                        >
                            No options found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NewComboBox;
