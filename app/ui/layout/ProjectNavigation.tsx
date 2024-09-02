
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import { MdDoubleArrow } from "react-icons/md";
import * as Constant from '@/lib/constant';
import { ImPlus } from "react-icons/im";


export default function ProjectNavigation() {

    const { subPage, setSubPage } = useMainUi();

    return (
        <>
            <div className="uppercase whitespace-nowrap border-b-2 border-b-white hover:border-b-light-sky-blue animate-shake" onClick={() => setSubPage(null)}>
                {AppStore.getProject() !== null && AppStore.getProject()!.name}
            </div>
            
            <MdDoubleArrow />

            <div 
                className={`cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue ${subPage === Constant.SUB_PAGE_TIMELINE && "border-light-sky-blue"}`} 
                onClick={() => setSubPage(Constant.SUB_PAGE_TIMELINE)}>
                    Timeline
            </div>

            <div 
                className={`cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue ${subPage === Constant.SUB_PAGE_CALENDAR && "border-light-sky-blue"}`} 
                onClick={() => setSubPage(Constant.SUB_PAGE_CALENDAR)}> 
                Calendar
            </div>

            <div 
                className={`cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-1 items-center ${subPage === Constant.SUB_PAGE_NEW_TASK && "border-light-sky-blue"}`} 
                onClick={() => setSubPage(Constant.SUB_PAGE_NEW_TASK)}>
                    <ImPlus className="size-2" />
                    <div> Task</div>
            </div>

            <div 
                className={`cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-2 items-center ${subPage === Constant.SUB_PAGE_NEW_MEETING && "border-light-sky-blue"}`} 
                onClick={() => setSubPage(Constant.SUB_PAGE_NEW_MEETING)}>
                    <ImPlus className="size-2" />
                    <div>Meeting</div>
                </div>

            <div 
                className={`cursor-pointer pr-5 border-b-2 border-white hover:border-light-sky-blue flex flex-row space-x-2 items-center ${subPage === Constant.SUB_PAGE_NEW_MILESTONE && "border-light-sky-blue"}`} 
                onClick={() => setSubPage(Constant.SUB_PAGE_NEW_MILESTONE)}>
                    <ImPlus className="size-2" /> 
                    <div>Millestone</div>
                </div>
        </>
    )
}