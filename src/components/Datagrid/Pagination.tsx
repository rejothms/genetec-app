import './Datagrid.css'
type paginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: paginationProps) => {
    return (
        <section className="datagrid-footer">
            <button className="pagination-back" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Back
            </button>
            <span className='page-count-label'>{currentPage} of {totalPages}</span>
            <button className="pagination-forward" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </section>
    )
}