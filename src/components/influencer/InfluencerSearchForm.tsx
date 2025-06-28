"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, AlertCircle } from "lucide-react"
import { influencerSearchFormSchema, type InfluencerSearchFormData } from "@/schemas"
import { useSearchStore } from "@/store/"
import {Label} from "../ui/label"
interface SearchFormProps {

  className?: string

}

const InfluencerSearchForm=({  className = "",  }: SearchFormProps)=> {
  const { isLoading, performSearch } = useSearchStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    // reset,
    // watch,
  } = useForm<InfluencerSearchFormData>({
    resolver: zodResolver(influencerSearchFormSchema),
    defaultValues: {
      influencers: "",
      category: "",

    },
    mode: "onChange",
  })

  const onSubmit = async (data: InfluencerSearchFormData) => {
    try {

        await performSearch(data)

    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const hasError = (field: keyof InfluencerSearchFormData) => {
    return touchedFields[field] && errors[field]
  }

  const isFormLoading = isLoading || isSubmitting

  return (
    <div className={`w-full max-w-4xl  ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`flex flex-col sm:flex-row gap-4 rounded-sm sm:rounded-full p-2 sm:px-10  transition-all duration-200 bg-[#1D232C] ${
            Object.keys(errors).length > 0 ? "ring-1 ring-red-200/20" : "hover:shadow-xl "
          }`}
        >
          {/* Influencers Input */}
          <div className="flex-1">
            <Label htmlFor="influencers" className="block text-base font-medium text-white mb-0 py-0 px-3">
              Influencers
            </Label>
            <input
              id="influencers"
              type="text"
              {...register("influencers")}
              placeholder="search influencers"
              className={`w-full px-3 py-2 text-white placeholder:text-[#D8D8D8] border-0 focus:outline-none focus:ring-0 transition-colors ${
                hasError("influencers") ? "text-red-600 placeholder-red-300" : ""
              }`}
              aria-invalid={hasError("influencers") ? "true" : "false"}
              aria-describedby={hasError("influencers") ? "influencers-error" : undefined}
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-200 my-2"></div>

          {/* Category Input */}
          <div className="flex-1">
            <Label htmlFor="category" className="block text-base font-medium text-white mb-0 py-0 px-3">
              Category
            </Label>
            <input
              id="category"
              type="text"
              {...register("category")}
              placeholder="Enter keywords, niches or categories"
              className={`w-full px-3 py-2 text-white  placeholder:text-[#D8D8D8] border-0 focus:outline-none focus:ring-0 transition-colors ${
                hasError("category") ? "text-red-600 placeholder-red-300" : ""
              }`}
              aria-invalid={hasError("category") ? "true" : "false"}
              aria-describedby={hasError("category") ? "category-error" : undefined}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isFormLoading}
            className="bg-[#2F353E]  disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-md sm:rounded-full transition-all duration-200 flex items-center justify-center sm:h-15 sm:w-15  hover:scale-105 active:scale-95 sm:self-center "
            aria-label="Search"
          >
            {isFormLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="size-6 " />
            )}
          </button>
        </div>
      </form>

      {/* Error Messages */}
      <div className="mt-2 space-y-1">
        {errors.influencers && (
          <div
            id="influencers-error"
            className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.influencers.message}</span>
          </div>
        )}
        {errors.category && (
          <div
            id="category-error"
            className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-top-1 duration-200"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.category.message}</span>
          </div>
        )}
      </div>


    </div>
  )
}
export default InfluencerSearchForm
