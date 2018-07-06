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
    [Route("api/TbRApproves")]
    public class TbRApprovesController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbRApprovesController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbRApproves
        [HttpGet]
        public IEnumerable<TbRApprove> GetTbRApprove()
        {
            return _context.TbRApprove;
        }

        // GET: api/TbRApproves/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbRApprove([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRApprove = await _context.TbRApprove.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbRApprove == null)
            {
                return NotFound();
            }

            return Ok(tbRApprove);
        }

        // PUT: api/TbRApproves/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbRApprove([FromRoute] short id, [FromBody] TbRApprove tbRApprove)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tbRApprove.YearActive)
            {
                return BadRequest();
            }

            _context.Entry(tbRApprove).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbRApproveExists(id))
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

        // POST: api/TbRApproves
        [HttpPost]
        public async Task<IActionResult> PostTbRApprove([FromBody] TbRApprove tbRApprove)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbRApprove.Add(tbRApprove);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbRApproveExists(tbRApprove.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbRApprove", new { id = tbRApprove.YearActive }, tbRApprove);
        }

        // DELETE: api/TbRApproves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbRApprove([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbRApprove = await _context.TbRApprove.SingleOrDefaultAsync(m => m.YearActive == id);
            if (tbRApprove == null)
            {
                return NotFound();
            }

            _context.TbRApprove.Remove(tbRApprove);
            await _context.SaveChangesAsync();

            return Ok(tbRApprove);
        }

        private bool TbRApproveExists(short id)
        {
            return _context.TbRApprove.Any(e => e.YearActive == id);
        }
    }
}