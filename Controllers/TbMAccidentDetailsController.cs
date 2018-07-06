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
    [Route("api/TbMAccidentDetails")]
    public class TbMAccidentDetailsController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMAccidentDetailsController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMAccidentDetails
        [HttpGet]
        public IEnumerable<TbMAccidentDetail> GetTbMAccidentDetail()
        {
            return _context.TbMAccidentDetail;
        }

        // GET: api/TbMAccidentDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMAccidentDetail([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMAccidentDetail = await _context.TbMAccidentDetail.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMAccidentDetail == null)
            {
                return NotFound();
            }

            return Ok(tbMAccidentDetail);
        }

        // PUT: api/TbMAccidentDetails/5
        [HttpPut]
        public async Task<IActionResult> PutTbMAccidentDetail([FromRoute] short id, [FromBody] TbMAccidentDetail tbMAccidentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMAccidentDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMAccidentDetailExists(id))
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

        // POST: api/TbMAccidentDetails
        [HttpPost]
        public async Task<IActionResult> PostTbMAccidentDetail([FromBody] TbMAccidentDetail tbMAccidentDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMAccidentDetail.Add(tbMAccidentDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMAccidentDetailExists(tbMAccidentDetail.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMAccidentDetail", new { id = tbMAccidentDetail.YearActive }, tbMAccidentDetail);
        }

        // DELETE: api/TbMAccidentDetails/5
        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbMAccidentDetail([FromBody] TbMAccidentDetail controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMAccidentDetail = await _context.TbMAccidentDetail.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.AccidentId == controlDelete.AccidentId);
            if (tbMAccidentDetail == null)
            {
                return NotFound();
            }

            _context.TbMAccidentDetail.Remove(tbMAccidentDetail);
            await _context.SaveChangesAsync();

            return Ok(tbMAccidentDetail);
        }

        private bool TbMAccidentDetailExists(short id)
        {
            return _context.TbMAccidentDetail.Any(e => e.YearActive == id);
        }
    }
}