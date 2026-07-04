import React from 'react'
import DataTable from 'react-data-table-component'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

// Custom styles to match the admin theme
const StyledDataTable = styled.div`
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.05);
  }
  .rdt_TableHeadRow {
    background-color: #f8f9fa;
    font-weight: 700;
    color: #111b13;
    border-bottom: 2px solid #2e8b47;
  }
  .rdt_TableRow {
    &:hover {
      background-color: #f0f7f0;
    }
  }
  .rdt_Pagination {
    border-top: 1px solid rgba(0,0,0,.05);
    color: #2d3a2e;
  }
  .rdt_TableCol_Sortable {
    &:hover {
      color: #2e8b47;
    }
  }
`

const CustomSpinner = () => (
  <div className="text-center py-4">
    <Spinner animation="border" variant="success" />
  </div>
)

const CustomNoData = () => (
  <div className="text-center py-4 text-muted">
    <i className="fas fa-inbox fa-2x mb-2" style={{ opacity: 0.3 }}></i>
    <p>No data available</p>
  </div>
)

// Main component – wraps react-data-table-component with default props
const CustomDataTable = ({
  columns,
  data,
  title,
  pagination = true,
  progressPending = false,
  noDataComponent = <CustomNoData />,
  progressComponent = <CustomSpinner />,
  ...rest
}) => {
  return (
    <StyledDataTable>
      <DataTable
        columns={columns}
        data={data}
        title={title}
        pagination={pagination}
        progressPending={progressPending}
        noDataComponent={noDataComponent}
        progressComponent={progressComponent}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 25, 50]}
        striped
        highlightOnHover
        responsive
        {...rest}
      />
    </StyledDataTable>
  )
}

// ✅ default export – essential
export default CustomDataTable