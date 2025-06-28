import { InfluencerCard } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { sampleInfluencers } from "@/constants"
import Link from "next/link"

const ListsPage=()=>{

//TODO - Get  the lists from the zustand store
    return(
        <section className="mb-10">

            <div className="flex items-center justify-between my-10">
                <h2 className="text-lg sm:text-lg font-semibold text-white">Lists</h2>

                <Button className="rounded-full" asChild>
                    <Link href="/influencers">Explore Influencers
                    </Link>
                </Button>
                </div>

                <div className="w-full sm:w-fit /w-[300px]">
                    <InfluencerCard {...sampleInfluencers[2]}  />
                </div>
        </section>
    )
}

export default ListsPage
