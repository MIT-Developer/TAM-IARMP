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
    [Route("api/TbRControlDetails")]
    public class TbRControlDetailsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRControlDetailsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRControlDetails
        [HttpGet]
        public IEnumerable<TbRControlDetail> GetTbRControlDetail()
        {
            return _context.TbRControlDetail;
        }

        // GET: api/TbRControlDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRControlDetail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRControlDetail = await _context.TbRControlDetail.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRControlDetail == null)
            {
                return NotFound();
            }

            return Ok(tbRControlDetail);
        }

        // PUT: api/TbRControlDetails/5
        [HttpPut]
        public async Task<IActionResult> PutTbRControlDetail([FromRoute] short id, [FromBody] TbRControlDetail tbRControlDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            _context.Entry(tbRControlDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRControlDetailExists(tbRControlDetail.YearActive, tbRControlDetail.RiskNo, tbRControlDetail.No))
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

        // POST: api/TbRControlDetails
        [HttpPost]
        public async Task<IActionResult> PostTbRControlDetail([FromBody] TbRControlDetail tbRControlDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRControlDetail.Add(tbRControlDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRControlDetailExists(tbRControlDetail.YearActive, tbRControlDetail.RiskNo, tbRControlDetail.No))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRControlDetail", new { id = tbRControlDetail.YearActive }, tbRControlDetail);
        }

        // DELETE: api/TbRControlDetails/5
        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbRControlDetail([FromBody] TbRControlDetail controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRControlDetail = await
             _context.TbRControlDetail.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.RiskNo == controlDelete.RiskNo && e.No == controlDelete.No);
            if (tbRControlDetail == null)
            {
                return NotFound();
            }

            _context.TbRControlDetail.Remove(tbRControlDetail);
            await _context.SaveChangesAsync();

            return Ok(tbRControlDetail);
        }

        private bool TbRControlDetailExists(short id, string riskno, short no)
        {
            return _context.TbRControlDetail.Any(e => e.YearActive == id && e.RiskNo == riskno && e.No == no);
        }
    }
}