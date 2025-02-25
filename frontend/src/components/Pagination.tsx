import { useState } from "react";
interface PaginationProps {
    propSetPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    propSetPageSize: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    pageSize: number;
}
const Pagination = ({propSetPage, totalPages, propSetPageSize, page, pageSize }: PaginationProps) => {
    const [localPage, setLocalPage] = useState<string|number>(1);
    const onFirstClickHandler = () => {
        propSetPage(1);
    }
    const onLastClickHandler = () => {
        propSetPage(totalPages);
    }
    const onPageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        propSetPageSize(Number(e.target.value));
    }
    const onNextHandler = () => {
        if(page < totalPages) propSetPage(page + 1);
    }
    const onPreviousHandler = () => {
        if(page > 1) propSetPage(page - 1);
    }
    const onLocalPageChange = (newPage: string) => {
        setLocalPage(newPage);
        if(Number(newPage) < 1 || Number(newPage) > totalPages) {
            return;
        };
        propSetPage(Number(newPage));
    }
    return (
        <>
        <div className="flex justify-between items-center flex-wrap mt-4">
            {/* Items Per Page */}
            <div className="flex items-center gap-2 md:mt-0 mt-2">
                <p className="text-sm">Items per page:</p>
                <select className=" px-2 border border-gray-300 rounded cursor-pointer" value={pageSize} onChange={onPageSizeChange}>
                    <option>10</option>
                    <option>20</option>
                </select>
            </div>

            {/* Page Navigation */}
            <div className="flex flex-wrap gap-2 md:mt-0 mt-2 ">
                {/* Go To Page */}
                <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <p className="text-sm">Go to page:</p>
                    <input
                        type="number"
                        min={1}
                        placeholder="1"
                        className="px-2 border border-gray-300 rounded w-12 text-center"
                        value={localPage}
                        onChange={(e) => onLocalPageChange(e.target.value)}
                    />
                </div>

                {/* Page Buttons */}
                <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:bg-blue-100 disabled:cursor-not-allowed" onClick={onFirstClickHandler} disabled={page===1?true:false}>
                        First
                    </button>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:bg-blue-100 disabled:cursor-not-allowed" onClick={onPreviousHandler} disabled={page===1?true:false}>
                        Previous
                    </button>
                    <p className="font-medium text-sm">{page} / {totalPages}</p>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:bg-blue-100 disabled:cursor-not-allowed" onClick={onNextHandler} disabled={page===totalPages?true:false}>
                        Next
                    </button>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:bg-blue-100 disabled:cursor-not-allowed" onClick={onLastClickHandler} disabled={page===totalPages?true:false}> 
                        Last
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Pagination;
