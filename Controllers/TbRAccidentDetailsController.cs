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
    [Route("api/TbRAccidentDetails")]
    public class TbRAccidentDetailsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRAccidentDetailsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRAccidentDetails
        [HttpGet]
        public IEnumerable<TbRAccidentDetail> GetTbRAccidentDetail()
        {
            return _context.TbRAccidentDetail;
        }

        // GET: api/TbRAccidentDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRAccidentDetail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRAccidentDetail = await _context.TbRAccidentDetail.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRAccidentDetail == null)
            {
                return NotFound();
            }

            return Ok(tbRAccidentDetail);
        }

        // PUT: api/TbRAccidentDetails/5
        [HttpPut]
        public async Task<IActionResult> PutTbRAccidentDetail([FromRoute] short id, [FromBody] TbRAccidentDetail tbRAccidentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbRAccidentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRAccidentDetailExists(id))
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

        // POST: api/TbRAccidentDetails
        [HttpPost]
        public async Task<IActionResult> PostTbRAccidentDetail([FromBody] TbRAccidentDetail tbRAccidentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRAccidentDetail.Add(tbRAccidentDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRAccidentDetailExists(tbRAccidentDetail.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRAccidentDetail", new { id = tbRAccidentDetail.YearActive }, tbRAccidentDetail);
        }

        // DELETE: api/TbRAccidentDetails/5
        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbRAccidentDetail([FromBody] TbRAccidentDetail controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRAccidentDetail = await _context.TbRAccidentDetail.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.AccidentId == controlDelete.AccidentId && e.RiskNo == controlDelete.RiskNo);
            if (tbRAccidentDetail == null)
            {
                return NotFound();
            }

            _context.TbRAccidentDetail.Remove(tbRAccidentDetail);
            await _context.SaveChangesAsync();

            return Ok(tbRAccidentDetail);
        }

        private bool TbRAccidentDetailExists(short id)
        {
            return _context.TbRAccidentDetail.Any(e => e.YearActive == id);
        }
    }
}