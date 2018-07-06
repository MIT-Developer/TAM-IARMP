using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tam_risk_project.Models;

namespace tam_risk_project.Controllers
{
    [Produces("application/json")]
    [Route("api/TbRTreatmentDetails")]
    public class TbRTreatmentDetailsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRTreatmentDetailsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRTreatmentDetails
        [HttpGet]
        public IEnumerable<TbRTreatmentDetail> GetTbRTreatmentDetail()
        {
            return _context.TbRTreatmentDetail;
        }

        // GET: api/TbRTreatmentDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRTreatmentDetail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRTreatmentDetail = await _context.TbRTreatmentDetail.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRTreatmentDetail == null)
            {
                return NotFound();
            }

            return Ok(tbRTreatmentDetail);
        }

        // PUT: api/TbRTreatmentDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbRTreatmentDetail([FromRoute] short id, [FromBody] TbRTreatmentDetail tbRTreatmentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbRTreatmentDetail.YearActive)
            {
                return BadRequest();
            }

            _context.Entry(tbRTreatmentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRTreatmentDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbRTreatmentDetails
        [HttpPost]
        public async Task<IActionResult> PostTbRTreatmentDetail([FromBody] TbRTreatmentDetail tbRTreatmentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRTreatmentDetail.Add(tbRTreatmentDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRTreatmentDetailExists(tbRTreatmentDetail.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRTreatmentDetail", new { id = tbRTreatmentDetail.YearActive }, tbRTreatmentDetail);
        }

        // DELETE: api/TbRTreatmentDetails/5
        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbRTreatmentDetail([FromBody] TbRTreatmentDetail controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRTreatmentDetail = await
            _context.TbRTreatmentDetail.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.RiskNo == controlDelete.RiskNo && e.No == controlDelete.No);
            if (tbRTreatmentDetail == null)
            {
                return NotFound();
            }

            _context.TbRTreatmentDetail.Remove(tbRTreatmentDetail);
            await _context.SaveChangesAsync();

            return Ok(tbRTreatmentDetail);
        }

        private bool TbRTreatmentDetailExists(short id)
        {
            return _context.TbRTreatmentDetail.Any(e => e.YearActive == id);
        }
    }
}