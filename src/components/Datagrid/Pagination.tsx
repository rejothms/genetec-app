import './Datagrid.css'
type paginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: paginationProps) => {
    return (
        <nav className="datagrid-footer" aria-label='table-pagination'>
            <button aria-disabled={currentPage === 1} aria-label="go to previouse page" className="pagination-back" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Back
            </button>
            <span aria-live="polite" aria-atomic="true" className='page-count-label'>{currentPage} of {totalPages}</span>
            <button aria-disabled={currentPage === totalPages} aria-label="Go to next page" className="pagination-forward" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </nav>
    )
}