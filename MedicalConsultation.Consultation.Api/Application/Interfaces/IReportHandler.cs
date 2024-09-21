using Application.Models;

namespace Application.Interfaces
{
    public interface IReportHandler
    {
        Task<ResponseModel<ReportModel>> GetReport(string doctorId, DateTime startDate, DateTime endDate);
    }
}
