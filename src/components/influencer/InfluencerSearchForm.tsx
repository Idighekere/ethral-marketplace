"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search, AlertCircle } from "lucide-react"
import { influencerSearchFormSchema, type InfluencerSearchFormData } from "@/schemas"
import { useSearchStore } from "@/store/"

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
    <div className={`w-full max-w-4xl ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div
          className={`flex flex-col sm:flex-row gap-4 rounded-lg p-2 shadow-lg transition-all duration-200 ${
            Object.keys(errors).length > 0 ? "ring-2 ring-red-200" : "hover:shadow-xl"
          }`}
        >
          {/* Influencers Input */}
          <div className="flex-1">
            <label htmlFor="influencers" className="block text-base font-medium text-white mb-1 px-3">
              Influencers
            </label>
            <input
              id="influencers"
              type="text"
              {...register("influencers")}
              placeholder="search influencers"
              className={`w-full px-3 py-2 text-gray-700 placeholder-gray-400 border-0 focus:outline-none focus:ring-0 transition-colors ${
                hasError("influencers") ? "text-red-600 placeholder-red-300" : ""
              }`}
              aria-invalid={hasError("influencers")}
              aria-describedby={hasError("influencers") ? "influencers-error" : undefined}
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-200 my-2"></div>

          {/* Category Input */}
          <div className="flex-1">
            <label htmlFor="category" className="block text-base font-medium text-white mb-1 px-3">
              Category
            </label>
            <input
              id="category"
              type="text"
              {...register("category")}
              placeholder="Enter keywords, niches or categories"
              className={`w-full px-3 py-2 text-white  placeholder-gray-400 border-0 focus:outline-none focus:ring-0 transition-colors ${
                hasError("category") ? "text-red-600 placeholder-red-300" : ""
              }`}
              aria-invalid={hasError("category")}
              aria-describedby={hasError("category") ? "category-error" : undefined}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isFormLoading}
            className="bg-[#2F353E]  disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-md transition-all duration-200 flex items-center justify-center min-w-[48px] hover:scale-105 active:scale-95"
            aria-label="Search"
          >
            {isFormLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="w-5 h-5" />
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
